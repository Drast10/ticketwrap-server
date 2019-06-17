const {Router} = require('express')
const models = require('../models');
const {auth,userId} = require('../auth/middleware');
const router = new Router()
const Event =models.events;


//all records

router.get('/events',auth,(req,res,next)=>{
  let user=userId(req,res,next);
  console.log(user)
  const limit = req.query.limit || 9
  const offset = req.query.offset || 0
  Event.count()
    .then(total=>{
      Event
      .findAll({limit, offset})
      .then(events =>{
        let page = Math.ceil(total/limit);
        res.send({events,total,page})
    })
    .catch(error => next(error))
   
    })
    .catch(error=>next(error)); 
})


router.post('/events', auth,(req,res, next)=>{
  let user=userId(req,res,next);
  console.log(user)
  console.log(user.user_id)
  const event = req.body
  event.user_id=user.user_id;
  console.log(event)
  Event
    .create(event)
    .then(event=>{
      return res.status(201).send(event)
    })
    .catch(error=>next(error))
})

// router.put('/events/:id',(req,res,next)=>{
//   const eventId = Number(req.params.id)
//   const update = req.body

//   Event
//     .findByPk(eventId)
//     .then(event=>{
//       return event.update(update)
//     })
//     .then(final=>{
//       res.send(final)
//     })
//     .catch(error=>{
//       res.staus(500).send({
//         message:'something went wrong'
//         .next(error)
//       })
//     })
// })

router.delete('/events/:id', (req, res) => {
  const eventId = Number(req.params.id)

  Event.findByPk(eventId)
	  .then(event => {
	    return event.destroy()
	  })
	  .then(_ => {
	    res.send({
	      message: 'The event was deleted succesfully'
	    })
	  })
	  .catch(error => {
	    res.status(500).send({
	      message: `Something went wrong`,
	      error
	    })
	  })
})

module.exports = router

