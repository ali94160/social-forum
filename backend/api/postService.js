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

  app.get("/api/posts", async (req, res) => {
    let sort = req.body.sort;
    let posts = await postModel.find({}).sort(sort);
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.sendStatus(204);
    }
  });
};
