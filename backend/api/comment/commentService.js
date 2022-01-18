const commentModel = require("../../models/comment");
const { authUserLoggedIn } = require("../../middlewares/acl");

module.exports = function (app) {
  app.post("/api/comments", authUserLoggedIn, async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    console.log("after first check");
    try {
      let newComment = new commentModel({
        ...req.body,
        createdDate: Date.now(),
        writeId: req.session.user._id,
      });
      console.log("created comment: ", newComment);
      const result = await newComment.save();
      console.log("result: ", result);
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
};
