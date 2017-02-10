'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 26],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    bio: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    level: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    reviewerStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Document);
        User.belongsToMany(models.Document, { through: 'Reviewer' });
        User.hasMany(models.Comment);
      },
    },
  });
  return User;
};
