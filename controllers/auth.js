const { Router } = require('express')
//const User = require('../models/users')
const models = require('../models');
const bcrypt = require('bcrypt')
const { toJWT } = require('../auth/jwt')
const router = new Router()
const User =models.users;
// define endpoints here
router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  console.log('email:', email)
  console.log('pass:', password)

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  else {
    // 1. find user based on email address
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }

        // 2. use bcrypt.compareSync to check the password against the stored hash
        if (bcrypt.compareSync(req.body.password, entity.password)) {

          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            userid: entity.id,
            userName: entity.name
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })

  }
})



module.exports = router
