'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    textLocation: {
      type: DataTypes.JSON,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User, {
          onDelete: "CASCADE", 
          foreignKey: {
            allowNull: false
          }
        })
        Comment.belongsTo(models.Document, {
          onDelete: "CASCADE", 
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Comment;
};