const commentModel = require("../../models/comment");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
    app.post("/api/comments", authUserLoggedIn, async (req, res) => {
        if (!req.body) {
          res.sendStatus(403);
          return;
        }
        try {
          let newComment = new commentModel({
            ...req.body,
            createdDate: Date.now(),
            writeId: req.session.user._id,
          });
          const result = await newComment.save();
          if (!result) {
            res.sendStatus(400);
            return;
          }
          res.sendStatus(200);
          return;
        } catch (error) {
          res.sendStatus(400);
          return;
        }
      });
      
    // ta bort sin kommentar
    app.delete('/api/user/comments/:id',
    authUserLoggedIn, authRole([roles.USER]),
    async (req, res) => {
        const user = { ...req.session.user };
        commentModel.findOneAndDelete({ _id: req.params.id, writeId: user._id },
            (err, comment) => {
                if(err) {
                    return res.status(500).json({message: 'There was an error deleting the comment', error: err})
                }
                if(!comment){
                    return res.status(403).json({message: 'No rights / comment not found'})
                }
            res.status(200).json({message: 'Successfully deleted', comment});
        });
    })


    // post comment for testing purposes
    app.post(
    "/api/comments/test",
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
