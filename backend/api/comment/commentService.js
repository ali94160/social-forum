const Comment = require("../../models/comment");
const Post = require("../../models/post");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
  app.post("/api/comments", authUserLoggedIn, async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    try {
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
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });

  app.delete(
    "/api/comments/:id",
    authUserLoggedIn,
    authRole([roles.ADMIN, roles.POSTOWNER, roles.POSTMODERATOR]),
    async (req, res) => {
      const user = { ...req.session.user };
      try {
        const comment = await Comment.findOne({ _id: req.params.id }).exec();
        const post = await Post.findOne({ _id: comment.postId }).exec();
        
        let hasAccess = user.roles.includes(roles.ADMIN);
        
        if (!hasAccess && user.roles.includes(roles.POSTOWNER)) {
          hasAccess = post.ownerId.toString() === user._id;
        }

        if (
          !hasAccess &&
          user.roles.includes(roles.POSTMODERATOR) &&
          post.moderatorIds.length > 0
        ) {
          hasAccess = post.moderatorsIds.includes(user._id);
        }

        if (hasAccess) {
          await Comment.findOneAndDelete({ _id: req.params.id });
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
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

  // post comment for testing purposes
  app.post("/api/comments/test", authUserLoggedIn, async (req, res) => {
    try {
      let comment = new Comment({
        content: "test blabla ",
        writeId: req.session.user._id,
        createdDate: Date.now(),
        postId: null,
      });
      await comment.save();
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });
};
