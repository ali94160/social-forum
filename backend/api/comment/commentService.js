const commentModel = require("../../models/comment");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
    // ta bort sin kommentar
    app.delete('/api/user/comments/:id',
    authUserLoggedIn, authRole([roles.USER]),
    async (req, res) => {
        const user = { ...req.session.user };
        commentModel.findOneAndDelete({ writeId: user._id, _id: req.params.id }, (err, comment) => {
            if(err) {
                res.sendStatus(403);
                return;
            }
            res.status(200).json({message: 'Successfully deleted', comment});
        });
    })


    // post comment for testing purposes
    app.post(
    "/api/comments",
    authUserLoggedIn,
    async (req, res) => {
      try {
        let comment = new commentModel({
            content: 'test blabla ',
            writeId: req.session.user._id,
            createdDate: Date.now(),
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
};
