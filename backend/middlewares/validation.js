const banModel = require("../models/ban");

function authUserLoggedIn(req, res, next) {
  if (req.session?.user) {
    res.sendStatus(400);
    return;
  }
  
  next()
}

async function bannedUser(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);
    return;
  }

  let bannedUser = await banModel.findOne({ email: req.body?.email });
  if (bannedUser) {
    res.sendStatus(403);
    return;
  }

  next()
}

function authRole(roles) {
  return (req, res, next) => {

    for (let foundRole of req.body.user.roles) {
      if (roles.includes(foundRole)) {
        next()
      }
    }
    
    res.status(401)
    return res.send('Not allowed')
  }
}

module.exports = {
  authUserLoggedIn,
  bannedUser,
  authRole
}