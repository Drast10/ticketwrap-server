'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  comments.associate = function(models) {
    comments.belongsTo(models.users, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
      as: 'users'
    });
    comments.belongsTo(models.tickets, {
      foreignKey: 'ticket_id',
      as: 'tickets'
    });
  };
  return comments;
};