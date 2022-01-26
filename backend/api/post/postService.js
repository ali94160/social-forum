const postModel = require("../../models/post");
const commentModel = require("../../models/comment");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const {
  isPostOwner,
  handleModerator,
  handleRoles,
} = require("../../middlewares/postOwner");
const roles = require("../../models/role");

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let posts = [];
    let filter = {}
    try {
      if (req.query.categoryId) {
        filter = { ...filter, categoryId: req.query.categoryId };
        delete req.query.categoryId
      }
      let data = await postModel
        .find(filter)
        .sort(req.query)
        .collation({ locale: "en" })
        .lean()
        .populate("ownerId", "username")
        .exec();
      
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
    try {
      let post = await postModel
        .findOne({ _id: req.params.id })
        .lean()
        .populate("categoryId")
        .populate("moderatorsIds", ["username"])
        .populate("ownerId", ["username", "roles"])
        .exec();

      const comments = await commentModel
        .find({ postId: req.params.id }, ["_id", "content", "createdDate"])
        .populate("writerId", ["_id", "username"])
        .exec();

      const commentLength = comments.length;

      post = { ...post, comments, commentLength };
      res.status(200).json(post);
    } catch (error) {
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
      await handleRoles(req.session.user._id, roles.POSTOWNER, true);
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
        .populate("moderatorsIds", ["username"])
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
      const post = await postModel
        .findOne({ _id: req.params.id })
        .lean()
        .exec();
      delete req.body.moderatorsIds;
      const updatedPost = { ...post, ...req.body };
      await postModel.replaceOne({ _id: req.params.id }, updatedPost);
      res.status(200).json(updatedPost);
    } catch (error) {
      return res.sendStatus(404);
    }
  });

  app.put(
    "/api/posts/:id/moderators",
    authUserLoggedIn,
    authRole([roles.POSTOWNER, roles.POSTMODERATOR]),
    handleModerator,
    async (req, res) => {
      try {
        return res.sendStatus(200);
      } catch (error) {
        return res.sendStatus(404);
      }
    }
  );

  app.delete("/api/posts/:id", authUserLoggedIn, authRole([roles.ADMIN, roles.POSTOWNER]), async (req, res) => {
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
      await handleRoles(req.session.user._id, roles.POSTOWNER, true);
      post.moderatorsIds.map(
        async (id) => await handleRoles(id, roles.POSTMODERATOR, false)
      );
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(403);
      return;
    }
  });

};
