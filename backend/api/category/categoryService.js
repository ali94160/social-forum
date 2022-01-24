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

  // 17.5 Skapa en route för att hämta alla kategorier, sortera bokstavsordning förutom Övrigt som ska ligga sist (4)
  app.get("/api/categories", async (req, res) => {
    let categories = [];
    try {
      let data = await postModel
        .find({})
        // .sort( )
        .collation({ locale: "en" })
        .lean()
        .exec();

      // add logic

    } catch (e) {
      res.sendStatus(400);
      return;
    }
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.sendStatus(204);
    }
  });

  
};
