const postModel = require("../models/post")

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let sort = req.body.sort;
    let posts = await postModel.find({}).sort(sort);
    if (posts.length > 0) {
      res.status(200).json(posts)
    }
    else {
      res.sendStatus(204)
    }
  })


}
