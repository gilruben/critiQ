'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'champagne_papi',
        email: 'carmar@gmail.com',
        password: 'password',
        bio: 'I\'m LIT!!!',
        rating: 350,
        level: 'college',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'edumacate',
        email: 'nhaque@gmail.com',
        password: 'password',
        bio: 'I have a phD in everythinG',
        rating: 2,
        level: 'other',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'j.pushw',
        email: 'jwu@gmail.com',
        password: 'password',
        bio: 'Graduated state Penn',
        rating: 9001,
        level: 'other',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'captain_crunch',
        email: 'captaincrunch@gmail.com',
        password: 'password',
        bio: 'Try my cereal, or else >:[',
        rating: 734,
        level: 'high_school',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'ruben_sandwich',
        email: 'rgil@gmail.com',
        password: 'password',
        bio: 'cache me outside, how bouh dat?',
        rating: 848,
        level: 'middle_school',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'hawaiin_charles',
        email: 'pikachu@gmail.com',
        password: 'password',
        bio: 'I love beating people at monopoly deal and typing really fast.',
        rating: 0,
        level: 'college',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
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
