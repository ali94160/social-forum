const postModel = require("../../models/post");
const commentModel = require("../../models/comment");
const { authUserLoggedIn } = require("../../middlewares/acl");
const { isPostOwner } = require("../../middlewares/postOwner");

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let posts = [];
    try {
      let data = await postModel
        .find({})
        .sort(req.query)
        .lean()
        .populate("ownerId", "username");
      for (let post of data) {
        let commentLength = await commentModel
          .find({ postId: post._id })
          .count();
        let resPost = { ...post, commentLength };
        posts.push(resPost);
      }
    } catch (e) {
      res.sendStatus(400);
      return;
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
      data = await postModel
        .find({ _id: req.params.id })
        .lean()
        .populate("categoryId")
        .populate("moderatorsIds", ["username"])
        .populate("ownerId", ["username", "roles"]);
      for (post of data) {
        const comments = await commentModel.find({ postId: req.params.id });
        const commentLength = comments.length;
        post = { ...post, comments, commentLength };
      }
      res.status(200).json(post);
    } catch (e) {
      res.sendStatus(404);
      return;
    }
  });

  app.post("/api/user/posts", authUserLoggedIn, async (req, res) => {
    if (!req.body) {
      res.sendStatus(403);
      return;
    }
    try {
      let newPost = new postModel({
        ...req.body,
        createdDate: Date.now(),
        ownerId: req.session.user._id,
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

  app.get("/api/user/posts", authUserLoggedIn, async (req, res) => {
    const userId = req.session.user._id;
    try {
      const posts = await postModel.find({ ownerId: userId }).lean();
      if (!posts) {
        res.sendStatus(404);
        return;
      }
      res.status(200).json(posts);
      return;
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.put("/api/posts/:id", authUserLoggedIn, isPostOwner, async (req, res) => {
    try {
      const post = await postModel.findOne({ _id: req.params.id }).lean().exec();
      const updatedPost = { ...post, ...req.body }
      await postModel.replaceOne({ _id: req.params.id}, updatedPost)
      res.status(200).json(updatedPost);
    } catch (e) {
      return res.sendStatus(403);
    }
  })
};
