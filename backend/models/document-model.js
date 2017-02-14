'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    body: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isObject: (val) => {
          if (typeof val !== 'object' || Array.isArray(val)) {
            throw new TypeError('body field must be an object!');
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    privacy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['public', 'private']]
      }
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Document.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
        Document.hasMany(models.Comment)
      }
    }
  });
  return Document;
};
