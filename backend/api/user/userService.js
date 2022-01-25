const userModel = require("../../models/user");
const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const roles = require("../../models/role");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
// const { hashUtil } = require("../utils");
const { passwordValidation } = require('../../middlewares/validation');

module.exports = user = (app) => {
  // delete your self
  app.delete(
    "/api/user/self",
    authUserLoggedIn,
    authRole([roles.USER]),
    passwordValidation,
    async (req, res) => {
      const user = { ...req.session.user };

      // if we made it all the way here all good, deleting user!
      await userModel.findByIdAndDelete(user._id);

      // now lets update comments and posts
      const commentsFromDb = await commentModel.updateMany(
        { writerId: user._id },
        { $set: { writerId: null } }
      );

      const postsFromDb = await postModel.updateMany(
        { ownerId: user._id },
        { $set: { ownerId: null } }
      );

      delete req.session.user; // log out user (in case we use Postman)

      res.status(200).json({
        message: "Success",
        commentsFound: commentsFromDb.matchedCount,
        commentsModified: commentsFromDb.modifiedCount,
        postsFound: postsFromDb.matchedCount,
        postsModified: postsFromDb.modifiedCount,
      });
    }
  );

  app.get(
    "/api/users/username/:username",
    authUserLoggedIn,
    async (req, res) => {
      const username = req.params.username;
      try {
        const userExists = await userModel
          .findOne({ username: username })
          .select("username");

        res.status(200).json(userExists);
      } catch (error) {
        res.sendStatus(400);
      }
    }
  );

  app.get('/api/admin', authUserLoggedIn, authRole([roles.ADMIN]), (req, res) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  });
};
