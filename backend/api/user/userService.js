const crypto = require("crypto");
const userModel = require("../../models/user");
const roles = require("../../models/role");
const { notBannedUser, userNotExists } = require("../../middlewares/validation");
const {
  authUserLoggedIn,
  authUserNotLoggedIn,
  authRole,
} = require("../../middlewares/acl");

module.exports = user = (app) => {
};
