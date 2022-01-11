function authUser(req, res, next) {
  if (req.body.user == null) {
    res.status(403)
    return res.send('You need to sign in')
  }

  next()
}

function authRole(roles) {
  return (req, res, next) => {

    for (let foundRole of req.body.user.roles) {
      if (roles.includes(foundRole)) {
        next()
      }
    }
    
    res.status(401)
    return res.send('Not allowed')
  }
}

module.exports = {
  authUser,
  authRole
}