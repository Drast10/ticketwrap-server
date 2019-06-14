const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./users/routes')
const eventRouter = require('./events/routes')
const authRouter = require('./auth/routes')

const app = express()
const port = process.env.PORT || 4000


  app
  .use(cors())
  .use(bodyParser.json())
  .use(userRouter)
  .use(eventRouter)
  .use(authRouter)
  .listen(port, ()=>console.log(`Listening on port ${port}`))