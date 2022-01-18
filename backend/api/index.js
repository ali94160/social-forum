const user = require("./user/userService");
const auth = require("./auth/authService");
const banlist = require("./ban/banService");
const post = require("./post/postService");
const comment = require("./comment/commentService");

module.exports = (app) => {
  user(app);
  auth(app);
  banlist(app);
  post(app);
  comment(app);
};
