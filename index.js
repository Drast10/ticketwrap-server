const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./controllers/users')
const eventRouter = require('./controllers/events')
const authRouter = require('./controllers/auth')
const ticketRouter = require('./controllers/tickets')
const commentsRouter = require('./controllers/comments')


const app = express()
const port = process.env.PORT || 4000


  app
  .use(cors())
  .use(bodyParser.json())
  .use(userRouter)
  .use(eventRouter)
  .use(authRouter)
  .use(ticketRouter)
  .use(commentsRouter)
  

  
  app.listen(port, ()=>console.log(`Listening on port ${port}`))