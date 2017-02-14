'use strict';
import documentSeeds from './document-seeds';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Documents',[
      {
        title: 'Masterpiece',
        body: documentSeeds[0],
        category: 'essay',
        privacy: 'public',
        active: true,
        deadline: new Date('2017-04-27').toISOString().slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },
      {
        title: 'My Diary',
        body: documentSeeds[1],
        category: 'other',
        privacy: 'public',
        active: true,
        deadline: new Date('2017-03-14').toISOString().slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: 'Puppies',
        body: documentSeeds[2],
        category: 'essay',
        privacy: 'public',
        active: true,
        deadline: new Date('2017-02-28').toISOString().slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3
      },
      {
        title: 'Why Pizza was, and should still be, a vegetable',
        body: documentSeeds[3],
        category: 'essay',
        privacy: 'public',
        active: true,
        deadline: new Date('2017-04-19').toISOString().slice(0, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3
      }
    });
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
