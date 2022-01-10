const crypto = require("crypto");

const secret = "goodLuckToHackThisSaltMsgBrevet00@haha.se";

module.exports = user = (app) => {
  //login
  app.post("/api/login", (req, res) => {
    //import model

    // see if user exists

    //encrypt password
    const hash = crypto
      .createHmac("sha256", secret)
      .update(req.body.password)
      .digest("hex");

    //send response, save
  });

  //logout
  app.delete("/api/logout", (req, res) => {
    if (req.session?.user) {
      delete req.session.user;
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });

  //register
  app.post("/api/register", (req, res) => {
    // fetch user model

    //validate email if it already exists

    const hash = crypto
      .createHmac("sha256", secret)
      .update(req.body.password)
      .digest("hex");

    // create user

    //save and send response
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
