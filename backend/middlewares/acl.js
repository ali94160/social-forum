const postModel = require("../models/post");

function authUserNotLoggedIn(req, res, next) {
  if (req.session?.user) {
    res.sendStatus(400);
    return;
  }
  
  next()
}

function authUserLoggedIn(req, res, next) {
  if (!req.session?.user) {
    res.sendStatus(401);
    return;
  }

  next()
}

function authRole(roles) {
  return (req, res, next) => {

    let found = false
    for (let foundRole of req.session.user.roles) {
      if (roles.includes(foundRole)) {
        found = true
      }
    }
    
    if (!found) {
      return res.sendStatus(401);
    }
    next()
  }
}

async function isPostOwner(req, res, next) {
  post = await postModel.findOne({ _id: req.params.id }).lean();
  if (post.ownerId._id !== req.session.user._id) {
    return res.sendStatus(401);
  }
  next()
}


module.exports = {
  authUserNotLoggedIn,
  authUserLoggedIn,
  authRole,
  isPostOwner
}