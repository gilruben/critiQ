const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const User = require('../backend/models').User;

describe('user-api-test', () => {
  // fake user data that we'll use for tests
  const users = [
    { username: 'shakespeare_papi', email: 'cmart@gmail.com', password: 'password', bio: 'I\'m LIT!!!', rating: 350, level: 'other' },
    { username: 'edumacate', email: 'nhaque@gmail.com', password: 'password', bio: 'I have a phD in everythinG', rating: 2, level: 'post-grad' },
    { username: 'j.pushw', email: 'jwu@gmail.com', password: 'password', bio: 'Graduated state Penn', rating: '9001', level: 'other' },
  ];


  before(() => User.sync({ force: true })
    .then(() => User.bulkCreate(users))
    .catch(err => console.log('DB Err!', err)));

  // Test to get all users route
  it('\'/api/users\' should respond with all users', (done) => {
    supertest(server)
      .get('/api/users')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].username).equal(users[0].username);
        expect(res.body[1].username).equal(users[1].username);
        expect(res.body[2].username).equal(users[2].username);
        done();
      });
  });

  // Test to create a new user
  xit('\'/api/users\' should respond with the user created', (done) => {
    const newUser = { username: 'rgil', email: 'rgil@gmail.com', password: 'password', bio: 'Lover of cake' };

    supertest(server)
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.body.username).equal(newUser.username);
        expect(res.body.email).equal(newUser.email);
        expect(res.body.password).equal(newUser.password);
        expect(res.body.bio).equal(newUser.bio);

        done();
      });
  });

  // Test to get a specific user
  xit('\'/api/users/:userId\' should respond with a specific user', (done) => {
    supertest(server)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res.body.id).equal(1);
        expect(res.body.username).equal(users[0].username);
        expect(res.body.email).equal(users[0].email);
        expect(res.body.password).equal(users[0].password);
        expect(res.body.bio).equal(users[0].bio);

        done();
      });
  });
});
