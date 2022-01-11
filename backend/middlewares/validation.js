function authUser(req, res, next) {
  if (req.session?.user) {
    res.sendStatus(400);
    return;
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