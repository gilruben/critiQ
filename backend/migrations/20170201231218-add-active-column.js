'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Documents',
      'active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        validate: {
          notNull: true
        }
      }
    )
  },
  down: function(queryInterface, Sequelize) {
    
  }
};
