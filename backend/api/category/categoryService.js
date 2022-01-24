const categoryModel = require("../../models/category");
const postModel = require("../../models/post");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
  // https://fonts.google.com/icons
  // <span class="material-icons-outlined"> tag </span>
  app.post(
    "/api/categories",
    authUserLoggedIn,
    authRole([roles.ADMIN]),
    async (req, res) => {
      if (!req.body) {
        res.sendStatus(403);
        return;
      }

      try {
        const result = await categoryModel(req.body).save();
        if (!result) {
          res.sendStatus(400);
          return;
        }
        res.status(200).json(result);
        return;
      } catch (error) {
        res.sendStatus(400);
        return;
      }
    }
  );

  app.delete(
    "/api/categories/:id",
    authUserLoggedIn,
    authRole([roles.ADMIN]),
    async (req, res) => {
      const categoryResponse = await categoryModel
        .findOne({ title: "General" })
        .exec();
      const generalId = categoryResponse._id;
      const category = await categoryModel.findById(req.params.id);
      if (category && categoryResponse) {
        try {
          await postModel.updateMany(
            { categoryId: req.params.id },
            { $set: { categoryId: generalId } }
          );
          await categoryModel.findOneAndDelete({ _id: req.params.id });
          res.sendStatus(200);
          return;
        } catch (error) {
          res.sendStatus(400);
          return;
        }
      }
      res.sendStatus(400);
    }
  );
};
