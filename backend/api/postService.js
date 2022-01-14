const postModel = require("../models/post")

module.exports = function (app) {
  app.get("/api/posts", async (req, res) => {
    let posts = await postModel.find({});
    if (posts.length > 0) {
      res.status(200).json(posts)
    }
    else {
      res.sendStatus(204)
    }
  })

  
}