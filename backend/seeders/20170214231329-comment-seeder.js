'use strict';
const commentSeeds = require('./comment-seeds');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', commentSeeds);
  },
  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
