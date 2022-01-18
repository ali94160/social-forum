const postModel = require("../models/post");

async function isPostOwner(req, res, next) {
  try {
    const post = await postModel.findOne({ _id: req.params.id }).lean().exec();
    if (post.ownerId._id != req.session.user._id) {
      return res.sendStatus(401);
    }
    next()
  } catch (error) {
    res.sendStatus(404)
  }
}

module.exports = {
  isPostOwner
}