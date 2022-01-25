const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const { passwordValidation } = require('../../middlewares/validation');
const Ban = require('../../models/ban');
const roles = require("../../models/role");

module.exports = banlist = (app) => {
  app.get("/api/bans", authUserLoggedIn, authRole([roles.ADMIN]), async (req, res) => {
    try {
      const response = await Ban.find({}).sort({ banDate: 'desc' }).exec();
      return res.status(200).json(response);
    } catch (error) {
      res.status(404).json(error);
    }
  });

  //unban 
  app.delete('/api/bans/:id', authUserLoggedIn, authRole([roles.ADMIN]), passwordValidation, async (req, res) => {
    try {
      await Ban.findOneAndDelete({ _id: req.params.id });
      return res.sendStatus(200);
    } catch (error) {
      res.senStatus(404);
    }
  });

};
