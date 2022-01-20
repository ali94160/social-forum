const postModel = require("../models/post");
const userModel = require("../models/user");
const role = require("../models/role");

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
      
      moderatorsArray.map(async (id) => await userModel.findOneAndUpdate({ _id: id }, { $addToSet: { roles: role.POSTMODERATOR } }).lean().exec());
        
      return res.sendStatus(200);
    }

    if (isModerator) {
      await postModel.updateOne({ _id: req.params.id }, { $pull: { moderatorsIds: req.session.user._id } });
      handleRoles([req.session.user._id], role.POSTMODERATOR, false)
      return res.sendStatus(200);
    }
    
    next()
  } catch (error) {
    return res.sendStatus(404);
  }
}

async function handleRoles(userId, role, owner) {
  try {
    let posts = owner ?
      await postModel.find({ ownerId: userId }).count().exec() :
      await postModel.find({ moderatorsIds: userId }).count().exec()
 
    if (posts > 0) {
      await userModel.updateOne({ _id: userId }, { $addToSet: { roles: role } }).lean().exec();
      return;
    }

    await userModel.updateOne({ _id: userId }, { $pull: { roles: role } }).lean().exec();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  isPostOwner,
  handleModerator,
  handleRoles
}