const commentModel = require("../models/comment");
const { notBannedUser, userNotExists } = require("../middlewares/validation");
const {
  authUserLoggedIn,
  authRole,
} = require("../middlewares/acl");

module.exports = comment = (app) => {
// post comment
app.post(
    "/api/postcomment",
    authUserLoggedIn,
    async (req, res) => {
      try {
        let comment = new commentModel({
            content: 'test blabla',
            writeId: req.session.user._id,
            createdDate: new Date().getTime(),
            postId: null
        });
        await comment.save();
        res.sendStatus(200);
        return;
      } catch (error) {
        res.sendStatus(400);
        return;
      }
    }
  );


}