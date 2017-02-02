'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      unique: true
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
      unique: true
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
    level: DataTypes.STRING,
      validate: {
        notNull: true
      }
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