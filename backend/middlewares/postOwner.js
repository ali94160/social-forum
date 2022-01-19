const postModel = require("../models/post");
const role = require("../models/role");

async function isPostOwner(req, res, next) {
  try {
    const post = await postModel.findOne({ _id: req.params.id }).lean().exec();
    console.log('what is post id', req.params.id)
    console.log('what is post owner id', post.ownerId._id);
    console.log('what is req session id', req.session.user._id);
    
    if (post.ownerId._id != req.session.user._id) {
      return res.sendStatus(401);
    }
    next()
  } catch (error) {
    console.log('something went wrong in middlew')
    res.sendStatus(404)
  }
}

async function handleModerator(req, res, next) {
  try {
    const post = await postModel.findOne({ _id: req.params.id }).lean().exec();
    const isModerator = post.moderatorsIds.some((id) => id == req.session.user._id)

    if (post.ownerId._id != req.session.user._id && !isModerator) {
      return res.sendStatus(403);
    }

    if (post.ownerId._id == req.session.user._id) {
      // using Set to remove duplicated from array, and converting it back to an array
      const moderatorsArray = Array.from(new Set(req.body.moderatorsIds));

      await postModel.updateOne({ _id: req.params.id },
        {
          $set: {
            moderatorsIds: moderatorsArray
          }
        })
      return res.sendStatus(200);
    }

    if (isModerator) {
      await postModel.updateOne({ _id: req.params.id }, { $pull: { moderatorsIds: req.session.user._id } });
      return res.sendStatus(200);
    }
    
    next()
  } catch (error) {
    return res.sendStatus(404);
  }
}

module.exports = {
  isPostOwner,
  handleModerator
}