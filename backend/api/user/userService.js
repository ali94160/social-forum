const userModel = require("../../models/user");
const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const roles = require("../../models/role");
const {
  authUserLoggedIn,
  authRole,
} = require("../../middlewares/acl");
const { hashUtil } = require('../utils')

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

      const hash = hashUtil(req.body?.password);

        if(user.password !== hash){
          res.status(403).json({
            message: 'Bad credentials.',
          })
          return;
        }
        
        // if we made it all the way here all good, deleting user!
        const userFromDb = await userModel.findByIdAndDelete(user._id);

        // now lets update comments and posts
        const commentsFromDb = await commentModel.updateMany({ writeId: user._id }, {"$set":{"writeId": null}});
        
        const postsFromDb = await postModel.updateMany({ ownerId: user._id }, {"$set":{"ownerId": null}});

        delete req.session.user // log out user (in case we use Postman)

        res.status(200).json({
          message: 'Success',
          commentsFound: commentsFromDb.matchedCount,
          commentsModified: commentsFromDb.modifiedCount,
          postsFound: postsFromDb.matchedCount,
          postsModified: postsFromDb.modifiedCount
        })
    }
  );
};
