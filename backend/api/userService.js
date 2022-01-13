const crypto = require("crypto");
const userModel = require("../models/user");
const roles = require("../models/role");
const { notBannedUser, userNotExists } = require("../middlewares/validation");
const {
  authUserLoggedIn,
  authUserNotLoggedIn,
  authRole,
} = require("../middlewares/acl");

module.exports = user = (app) => {
  // delete your self
  app.delete(
    "/api/user/self",
    authUserLoggedIn,
    authRole([roles.USER]),
    async (req, res) => {
      const user = { ...req.session.user };
      const password = req.body.password

      if(!password) {
        res.json('where is password?');
        // res.sendStatus(400); // bad request
        return;
      }

      const hash = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(password)
        .digest("hex");

        if(user.password !== hash){
          res.json('password not matchy match');
          // res.sendStatus(400);
          return;
        }
        
        // if we made it all the way here all good, deleting user!
        try{
          // const userFromDb = await userModel.findByIdAndDelete(user._id);
          const userFromDb = await userModel.findById(user._id).exec();
          // res.sendStatus(200);
          res.json('deleting user from db');
        } catch(err){
          res.json('smth went really wrong oj');
          return;
        }
    }
  );

};
