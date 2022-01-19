const commentModel = require("../../models/comment");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
  app.post("/api/comments", authUserLoggedIn, async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    try {
      let newComment = new commentModel({
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
      const id = req.params.id;
      const comment = await commentModel.findOne({ _id: id }).exec();
      // check if user is admin
      if (req.params.roles.includes(roles.ADMIN)) {
        // delete
      }
      console.log(comment);

      // check if user is owner
      if (req.params.roles.includes(roles.POSTOWNER)) {
        const isOwner = comment.ownerId === user._id;
      }
      
      try {
        
      } catch (error) {}
    }
  );

  // user remove their own comment
  app.delete(
    "/api/user/comments/:id",
    authUserLoggedIn,
    authRole([roles.USER]),
    async (req, res) => {
      const user = { ...req.session.user };
      commentModel.findOneAndDelete(
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
      let comment = new commentModel({
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
