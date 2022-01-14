const postModel = require("../models/post");
const { authUserLoggedIn } = require("../middlewares/acl");

module.exports = function (app) {
  app.post("/api/user/posts", authUserLoggedIn, async (req, res) => {
    try {
      let newPost = new postModel({
        ...req.body,
        createdDate: new Date().getTime(),
        ownerId: req.session.user.id,
      });
      await newPost.save();
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });
};
