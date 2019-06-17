const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL ||  'postgres://ticketWrap:LetMeIn@localhost:5432/ticketWrap'
const sequelize = new Sequelize(connectionString , {defin:{timestamps:false}})

sequelize.sync({force:true})
  .then(()=>{
    console.log('Sequelize updated database schema')
  })
  .catch(console.error)
  module.exports = sequelize;



  
 

  
  
  
