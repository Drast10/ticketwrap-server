'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  events.associate = function(models) {
    events.belongsTo(models.users, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
      as: 'users'
    });
    events.hasMany(models.tickets, {
      foreignKey: 'event_id',
      as: 'events'
    });
  };
  return events;
};