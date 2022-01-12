const banModel = require("../models/ban");
const userModel = require("../models/user");

async function notBannedUser(req, res, next) {
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

async function userNotExists(req, res, next) {
  if (!req.body.email || !req.body.username) {
    res.sendStatus(400);
    return;
  }

  let userAlreadyExistsByEmail = await userModel.findOne({
      email: req.body?.email,
    });
  let userAlreadyExistsByUsername = await userModel.findOne({
      username: req.body?.username,
    });

  if (userAlreadyExistsByEmail || userAlreadyExistsByUsername) {
    res.sendStatus(400);
    return;
  }

  next()
}

module.exports = {
  notBannedUser,
  userNotExists,
}