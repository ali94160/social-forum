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
  //login
  app.post(
    "/api/login",
    authUserNotLoggedIn,
    notBannedUser,
    async (req, res) => {
      const hash = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(req.body?.password)
        .digest("hex");

      let user;
      try {
        user = await userModel.findOne({
          email: req.body.email,
          password: hash,
        });
      } catch (error) {
        res.sendStatus(400);
      }
      if (user) {
        req.session.user = user;
        res.sendStatus(200);
        return;
      }
      res.sendStatus(400);
    }
  );

  //logout
  app.delete(
    "/api/logout",
    authUserLoggedIn,
    authRole([roles.USER, roles.ADMIN]),
    (req, res) => {
      delete req.session.user;
      res.sendStatus(200);
    }
  );

  //register
  app.post(
    "/api/register",
    authUserNotLoggedIn,
    notBannedUser,
    userNotExists,
    async (req, res) => {
      const hash = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(req.body?.password)
        .digest("hex");

      try {
        let user = new userModel({
          ...req.body,
          password: hash,
          roles: [roles.USER],
        });
        await user.save();
        res.sendStatus(200);
        return;
      } catch (error) {
        res.sendStatus(400);
        return;
      }
    }
  );

  //current user
  app.get(
    "/api/whoAmI",
    authUserLoggedIn,
    authRole([roles.USER, roles.ADMIN]),
    (req, res) => {
      let user = { ...req.session.user };
      delete user.email;
      delete user.password;
      res.json(user);
    }
  );
};
