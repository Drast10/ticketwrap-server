'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    risk: DataTypes.INTEGER,
    date: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  tickets.associate = function(models) {
    tickets.belongsTo(models.users, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
      as: 'users'
    });
    tickets.belongsTo(models.events, {
      onDelete: 'CASCADE',
      foreignKey: 'event_id',
      as: 'events'
    });
    tickets.hasMany(models.comments, {
      foreignKey: 'ticket_id',
      as: 'tickets'
    });
  };
  return tickets;
};