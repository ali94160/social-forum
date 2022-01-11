const crypto = require("crypto");
const userModel = require("../models/user");
const roles = require("../models/role");

const secret = "goodLuckToHackThisSaltMsgBrevet00@haha.se";

module.exports = user = (app) => {
  //login
  app.post("/api/login", async (req, res) => {
    if (req.session?.user) {
      res.sendStatus(400);
      return;
    }
    const hash = crypto
      .createHmac("sha256", secret)
      .update(req.body?.password)
      .digest("hex");

    let user = await userModel.findOne({
      email: req.body.email,
      password: hash,
    });
    if (user) {
      req.session.user = user;
      res.sendStatus(200);
      return;
    }
    res.sendStatus(400);
  });

  //logout
  app.delete("/api/logout", (req, res) => {
    if (req.session?.user) {
      delete req.session.user;
      res.sendStatus(200);
      return;
    }
    res.sendStatus(400);
  });

  //register
  app.post("/api/register", async (req, res) => {
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

    const hash = crypto
      .createHmac("sha256", secret)
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
  });

  //current user
  app.get("/api/whoAmI", (req, res) => {
    if (req.session?.user) {
      let user = { ...req.session.user };
      delete user.password;
      res.json(user);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
};
