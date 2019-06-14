const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('./model')


const router = new Router()

router.post('/users', (req,res, next)=>{
  // console.log('name:',req.body.name)
  // console.log('email:',req.body.email)
  // console.log('password:', bcrypt.hashSync(req.body.password, 5))

  const user = {
    name:req.body.name,
    email:req.body.email,
    password: bcrypt.hashSync(req.body.password, 5)
  }

  User
    .create(user)
    .then(user=>{
      if(!user){
        return res.status(400).send({
          message:'user doesnot exist'
        })
      }
      return res.status(201).send(user)
    })
    .catch(error=>next(error))
})

router.get('/users',(req,res,next)=>{
  User
    .findAll()
    .then(users =>{
      res.send({users})
    })
    .catch(error=>next(error));  
})

module.exports = router