const postModel = require("../../models/post");
const commentModel = require("../../models/comment");
const { authUserLoggedIn } = require("../../middlewares/acl");
const { isPostOwner } = require("../../middlewares/postOwner");
const roles = require("../../models/role");

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
      res.status(200).json(newPost);
      return;
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  });

  app.get("/api/user/posts", authUserLoggedIn, async (req, res) => {
    const userId = req.session.user._id;
    let myPosts = [];
    try {
      const posts = await postModel
        .find({ ownerId: userId })
        .lean()
        .populate("ownerId", "username")
        .exec();

      for (let post of posts) {
        let commentLength = await commentModel
          .find({ postId: post._id })
          .count();
        let resPost = { ...post, commentLength };
        myPosts.push(resPost);
      }

      if (!myPosts) {
        res.sendStatus(404);
        return;
      }
      res.status(200).json(myPosts);
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
    } catch (error) {
      return res.sendStatus(403);
    }
  })

  app.delete("/api/posts/:id", authUserLoggedIn, async (req, res) => {
    let user = req.session.user;
    let filter = {
      _id: req.params.id,
    };

    if (!user.roles.includes(roles.ADMIN)) {
      filter.ownerId = user._id;
    }

    try {
      let post = await postModel.findOne(filter).lean();
      await commentModel.deleteMany({ postId: post._id });
      await postModel.deleteOne(filter);

      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(403);
      return;
    }
  });
};
