const crypto = require("crypto");

const secret = "goodLuckToHackThisSaltMsg@haha.se"

module.exports = user = (app) => {
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
};
