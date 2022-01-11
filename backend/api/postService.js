const { authRole } = require('../middlewares/authRole')
const roles = require('../models/role')

module.exports = function (app) {
  app.post('/api/posts', authRole([roles.ADMIN, roles.ANONYMOUS]), (req, res) => {
    res.send('Hello')
  })
}