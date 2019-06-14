const Sequelize = require('sequelize')
const sequelize = require('../db')
// const User =require('../users/model')

const Event = sequelize.define('events', {
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  image:{
    type: Sequelize.STRING,
  },
  start:{
    type: Sequelize.STRING,
    allowNull: false
  },
  end:{
    type: Sequelize.STRING,
    allowNull: false
  },


},{
  timestamps: false,
  tableName: 'events'
})
// Event.hasOne(User);
//Trainer.hasMany(Series);

module.exports = Event
 