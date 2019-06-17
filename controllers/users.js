const {Router} = require('express')
const bcrypt = require('bcrypt')
//const User = require('../models/users')
const models = require('../models');


const router = new Router()
const User =models.users;
router.post('/users', (req,res, next)=>{
  console.log('name:',models.users)
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

router.get('/users/:id',(req,res,next)=>{

  User
    .findByPk(req.params.id)
    .then(user=>{
      res.send({name:user.name})
    })
    .catch(error=>{
      res.staus(500).send({
        message:'something went wrong'
        .next(error)
      })
    })
  
})

module.exports = router