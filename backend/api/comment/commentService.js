const Comment = require("../../models/comment");
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

  app.get("/api/post/comments/:postId", async (req, res) => {
    try {
      let comments = await Comment.find({ postId: req.params.postId })
        .populate("writerId", ["username"])
        .lean()
        .exec();
      if (comments.length > 0) {
        res.status(200).json(comments);
        return;
      }
      res.sendStatus(204);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });

  // ta bort sin kommentar
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
