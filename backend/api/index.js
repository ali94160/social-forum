const user = require("./userService");
const auth = require("./auth/authService");
const banlist = require("./banService");
const post = require("./postService");

module.exports = (app) => {
user(app);
auth(app);
banlist(app);
post(app);
}
