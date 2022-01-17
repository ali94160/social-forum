const postModel = require("../../models/post");
const commentModel = require("../../models/comment")

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let posts = [];
    try {
      let data = await postModel.find({}).sort(req.query).lean().populate("ownerId", "username");
      for (let post of data) {
        let commentLength = await commentModel
          .find({ postId: post._id })
          .count();
        let resPost = { ...post, commentLength };
        posts.push(resPost)
      }
    } catch (e) {
      res.sendStatus(400);
      return
    }
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.sendStatus(204);
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    let post;
    try {
      data = await postModel.find({ _id: req.params.id })
        .populate("categoryId")
        .populate("moderatorsIds", ["username"])
        .populate("ownerId", ["username", "roles"]);
      for (post of data) {
        let comments = await commentModel.find({ postId: req.params.id });
        let commentLength = comments.length;
        post = { ...post._doc, comments, commentLength};
      }
      res.status(200).json(post);
    } catch (e) {
      res.sendStatus(404);
      return
    }
  })
};