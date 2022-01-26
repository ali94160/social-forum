const Comment = require("../../models/comment");
const Post = require("../../models/post");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");
const User = require("../../models/user");

module.exports = function (app) {
  app.post("/api/comments",
  authUserLoggedIn,
  authRole([roles.USER]),
  async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    try {
      const post = await Post.findById(req.body.postId).select("ownerId").exec();
      if (!post.ownerId && !(await User.findById(post.ownerId))) {
        res.sendStatus(400);
        return;
      }
      let newComment = new Comment({
        ...req.body,
        createdDate: Date.now(),
        writerId: req.session.user._id,
      });
      const result = await newComment.save();
      if (!result) {
        res.sendStatus(400);
        return;
      }
      res.status(200).json(result);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });

  app.get("/api/post/comments/:postId", async (req, res) => {
    try {
      let comments = await Comment.find({ postId: req.params.postId })
        .sort({ createdDate: req.query.createdDate })
        .collation({ locale: "en" })
        .populate("writerId", ["username"])
        .lean()
        .exec();

      if (comments.length > 0) {
        res.status(200).json(comments);
        return;
      }
      res.sendStatus(404);
      return;
    } catch (error) {
      res.sendStatus(404);
      return;
    }
  });

  // ta bort sin kommentar
  app.delete(
    "/api/comments/:id",
    authUserLoggedIn,
    authRole([roles.ADMIN, roles.POSTOWNER, roles.POSTMODERATOR]),
    async (req, res) => {
      const user = { ...req.session.user };
      try {
        const comment = await Comment.findOne({ _id: req.params.id }).exec();

        let isAdmin = user.roles.includes(roles.ADMIN);
        let isOwner;
        let isModerator;

        if (!isAdmin) {
          const post = await Post.findOne({ _id: comment.postId }).exec();
            isOwner = post.ownerId !== null && post.ownerId.toString() === user._id;
            if (!isOwner) {
              isModerator = post.moderatorsIds.includes(user._id);
            }
        }

        if (isAdmin || isOwner || isModerator) {
          await Comment.findOneAndDelete({ _id: req.params.id });
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
        return;
      } catch (error) {
        res.sendStatus(400);
        return;
      }
    }
  );

  // user remove their own comment
  app.delete(
    "/api/user/comments/:id",
    authUserLoggedIn,
    authRole([roles.USER]),
    async (req, res) => {
      const user = { ...req.session.user };
      Comment.findOneAndDelete(
        { _id: req.params.id, writerId: user._id },
        (err, comment) => {
          if (err) {
            return res.sendStatus(500);
          }
          if (!comment) {
            return res.sendStatus(403);
          }
          res.sendStatus(200);
        }
      );
    }
  );
};
