'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  users.associate = function(models) {
    users.hasMany(models.events, {
      foreignKey: 'user_id',
      as: 'event_users'
    });

    users.hasMany(models.tickets, {
      foreignKey: 'user_id',
      as: 'ticket_users'
    });
    users.hasMany(models.comments, {
      foreignKey: 'user_id',
      as: 'comments_users'
    });
  };
  return users;
};