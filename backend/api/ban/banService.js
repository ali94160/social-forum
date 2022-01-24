const { authUserLoggedIn, authRole } = require("../../middlewares/acl");
const Ban = require('../../models/ban');
const roles = require("../../models/role");
const { hashUtil } = require("../utils");

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
  app.delete('/api/bans/:id', authUserLoggedIn, authRole([roles.ADMIN]), async (req, res) => {
    const user = { ...req.session.user };
    const password = req.body.password;

    if (!password) {
      /// check this one
      return res.sendSatus(400);
    }

    const hash = hashUtil(req.body?.password);

    if (user.password !== hash) {
      return res.sendStatus(403);
    }

    try {
      console.log('everythings good')
      await Ban.findOneAndDelete({ _id: req.params.id });
      return res.sendStatus(200);
    } catch (error) {
      res.status(404).json(error);
    }

  });

};
