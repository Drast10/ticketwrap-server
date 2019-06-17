const {Router} = require('express')
//const Comment = require('../models/comments')
const models = require('../models');
const router = new Router()
const Comment =models.comments;
const {auth,userId} = require('../auth/middleware');

router.get('/tickets/:ticket_id/comments',auth,(req,res,next)=>{
  console.log(req.params.ticket_id)
  Comment
    .findAll({where: {
      ticket_id: req.params.ticket_id
    }})
    .then(comments=>{
      res.send({comments})
    })
    .catch(err=>next(err));
})


router.post('/tickets/:ticket_id/comments',auth, (req,res, next)=>{
  const comment = req.body
  let user=userId(req,res,next);
  console.log(user)

  comment.user_id=user;
  comment.ticket_id=req.params.ticket_id;
  console.log(comment)
  Comment
    .create(comment)
    .then(comment=>{
      return res.status(201).send(comment)
    })
    .catch(error=>next(error))
})

module.exports = router