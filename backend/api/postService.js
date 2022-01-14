module.exports = function (app) {
  app.post("/api/user/posts", async (req, res) => {
    if (!req.session?.user) {
      res.sendStatus(401);
      return;
    }
    try {
      let newPost = new postModel({
        ...req.body,
        createdDate: new Date().getTime(),
        ownerId: req.session.user.id,
      });
      await newPost.save();
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(400);
    }
    res.sendStatus(400);
  });
};
