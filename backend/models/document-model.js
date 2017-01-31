'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    body: {
      type: DataTypes.JSON,
      validate: {
        notNull: true
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    privacy: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: [['public', 'private']]
      }
    },
    deadline: {
      type: DataTypes.DATEONLY,
      validate: {
        notNull: true
      }
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
