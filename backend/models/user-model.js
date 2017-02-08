'use strict';

const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

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
    // bio: DataTypes.TEXT,
    // rating: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0,
    //   validate: {
    //     min: 0,
    //   },
    // },
    // level: {
    //   type: DataTypes.STRING,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
    // reviewerStatus: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // },
  },
    {
      hooks: {
        beforeCreate: function(user, options, next) {
          bcrypt.genSalt(8, function(err, salt){
            if(err){
              throw err
            }
            bcrypt.hash(user.password, salt, null, function(ele, hash){
              if(err){
                throw err
              }
              console.log(user.password, hash)
              user.password=hash
              next()
            })
          })
        },
      },
    },
    {
    comparePassword: function(potentialpass, cb){
      bcrypt.compare(potentialpass, this.password, function(err, ismatch){
        if(err){
          throw err
        }else{
          cb(null, ismatch)
        }
      })
    }
    },
    {
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
