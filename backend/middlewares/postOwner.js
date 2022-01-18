const postModel = require("../models/post");

async function isPostOwner(req, res, next) {
  post = await postModel.findOne({ _id: req.params.id }).lean();
  if (post.ownerId._id != req.session.user._id) {
    return res.sendStatus(401);
  }
  next()
}

module.exports = {
  isPostOwner
}