const Sequelize = require('sequelize')
const sequelize = require('../db')
const Event =  require('../events/model')

const User = sequelize.define('users', {
  name:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
},{
  timestamps: false,
  tableName: 'users'
})

User.belongsTo(Event)

module.exports = User
 