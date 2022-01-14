const postModel = require("../models/post");
const { authUserLoggedIn } = require("../middlewares/acl");

module.exports = function (app) {
  app.post("/api/user/posts", authUserLoggedIn, async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    try {
      let newPost = new postModel({
        ...req.body,
        createdDate: Date.now(),
        ownerId: req.session.user.id,
      });
      const result = await newPost.save();
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
