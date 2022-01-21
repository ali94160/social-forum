const categoryModel = require("../../models/category");
const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const roles = require("../../models/role");

module.exports = function (app) {
    // https://fonts.google.com/icons
    // <span class="material-icons-outlined"> tag </span>
  app.post("/api/categories", authUserLoggedIn, authRole([roles.ADMIN]), async (req, res) => {
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
  });

  
};
