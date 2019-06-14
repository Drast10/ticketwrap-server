const {Router} = require('express')
const Event = require('./model')

const router = new Router()

//all records
router.get('/events',(req,res,next)=>{
  Event
    .findAll()
    .then(events =>{
      res.send({events})
    })
    .catch(error=>next(error)); 
})


router.post('/events', (req,res, next)=>{
  const event = req.body
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

