const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const User = require('../backend/models').User;

describe('user-api-test', () => {
  // Fake user data that we'll use for tests
  const users = [
    { username: 'shakespeare_papi', email: 'cmart@gmail.com', password: 'password', bio: 'I\'m LIT!!!', rating: 350, level: 'high_school' },
    { username: 'edumacate', email: 'nhaque@gmail.com', password: 'password', bio: 'I have a phD in everythinG', rating: 2, level: 'college' },
    { username: 'j.pushw', email: 'jwu@gmail.com', password: 'password', bio: 'Graduated state Penn', rating: 9001, level: 'middle_school' }
  ];

  let newUser = { username: 'nate_dogg', email: 'ndogg@gmail.com', password: 'password', bio: 'I love scooby snacks', rating: 3522, level: 'other' };

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
  it('\'/api/users\' should respond with the user created', (done) => {

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
  it('\'/api/users/:id\' should respond with a specific user', (done) => {
    supertest(server)
    .get('/api/users/1')
    .end((err, res) => {
      expect(res.body.id).equal(1);
      expect(res.body.username).equal(users[0].username);
      expect(res.body.email).equal(users[0].email);
      expect(res.body.bio).equal(users[0].bio);

      done();
    });
  });

  // Test to edit a users info
  it('\'/api/users/:id\' should respond with new user data', (done) => {
    const newData =  { username: 'ndogg', bio: 'Let me school you'}
    newUser['username'] = 'ndogg';
    newUser['bio'] = 'Let me school you';

    supertest(server)
    .put('/api/users/4')
    .send(newData)
    .end((err, res) => {
      expect(res.body.id).equal(4);
      expect(res.body.username).equal(newUser.username);
      expect(res.body.bio).equal(newUser.bio);

      done();
    });
  });


  // Test to delete a user
  it('\'/api/users/:id\' should respond an object', (done) => {
    supertest(server)
      .delete('/api/users/4')
      .end((err, res) => {
        expect(res.body).eql({ usersDeleted: 1 });

        done();
      });
  });

  // Test to create a new user with invalid email and rating data
  it('\'/api/users\' should respond with an error', (done) => {
    const newUser = { username: 'captain_crunch', email: 'captaincgmail.com', password: 'password', bio: 'Try my cereal, or else >:[', rating: -1, level: 'middle_school' };
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

  // Test to create a new user with username and email that already exist
  it('\'/api/users\' should respond with an error', (done) => {
    const newUser = { username: 'edumacate', email: 'nhaque@gmail.com', password: 'password', bio: 'I have a phD in everythinG', rating: 2, level: 'other' };

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

});
