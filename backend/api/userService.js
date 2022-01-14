const crypto = require("crypto");
const userModel = require("../models/user");
const commentModel = require("../models/comment");
const postModel = require("../models/post");
const roles = require("../models/role");
const {
  authUserLoggedIn,
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
      const password = req.body.password;

      if(!password) {
        res.status(403).json({
          message: 'No password.',
        })
        return;
      }

      const hash = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(password)
        .digest("hex");

        if(user.password !== hash){
          res.status(403).json({
            message: 'Bad credentials.',
          })
          return;
        }
        
        // if we made it all the way here all good, deleting user!
        // const userFromDb = await userModel.findByIdAndDelete(user._id);
        const userFromDb = await userModel.findById(user._id).exec(); // uncomment above and delete this row

        // now lets delete all posts + comments
        const commentsFromDb = await commentModel.deleteMany({ writeId: user._id }); // returns {deletedCount: Number}
        const postsFromDb = await postModel.deleteMany({ ownerId: user._id });

        // logging out user
        delete req.session.user;

        res.status(200).json({
          message: 'Success',
          commentsDeleted: commentsFromDb.deletedCount,
          postsDeleted: postsFromDb.deletedCount
        })
    }
  );
};
