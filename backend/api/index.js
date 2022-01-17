const user = require("./userService");
const auth = require("./auth/authService");
const banlist = require("./banService");
const post = require("./postService");
const comment = require("./commentService");

module.exports = (app) => {
user(app);
auth(app);
banlist(app);
post(app);
comment(app);
}
