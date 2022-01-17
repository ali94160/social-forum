const postModel = require("../../models/post");

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let posts;
    try {
      posts = await postModel.find({}).sort(req.query);
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
};
