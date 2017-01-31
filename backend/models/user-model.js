'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8,26],
        notNull: true
      }
    },
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true
      }
    },
    bio: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { 
        min: 0
      }
    },
    level: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Document)
        User.hasMany(models.Comment)
      }
    }
  });
  return User;
};