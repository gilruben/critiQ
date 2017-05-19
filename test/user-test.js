const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const agent = supertest.agent(server);

describe('user-api-test', () => {
  let newUser = { username: 'nate_dogg', email: 'ndogg@gmail.com', password: 'password', level: 'other' };

  // Test to create a new user
  it('\'/api/users\' should respond with the user created', (done) => {
    supertest(server)
    .post('/api/users')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.username).equal(newUser.username);
      expect(res.body.email).equal(newUser.email);
      expect(res.body.password).equal(newUser.password);

      done();
    });
  });


  // Logs in user
  it('\'/auth/login\' will log in the user', (done) => {
    agent
    .post('/auth/login')
    .send({ email: newUser.email, password: newUser.password })
    .end((err, res) => {
      done();
    });
  });


  // Test to get all users
  it('\'/api/users\' should respond with all users', (done) => {
    agent
    .get('/api/users')
    .end((err, res) => {
      expect(res.body.length).equal(7);
      expect(res.body[0].username).equal('champagne_papi');
      expect(res.body[1].username).equal('edumacate');
      expect(res.body[2].username).equal('j.pushw');

      done();
      });
  });


  // Test to have an unauthenticated user get all users
  it('\'/api/users\' should respond with a 401 status code', (done) => {
    supertest(server)
    .get('/api/users')
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
      });
  });


  // Test to get the logged in user's data
  it('\'/api/users/individual\' should respond with logged in user\'s data', (done) => {
    agent
    .get('/api/users/individual')
    .end((err, res) => {
      expect(res.body.username).equal(newUser.username);
      expect(res.body.email).equal(newUser.email);

      done();
    });
  });


  // Test to attempt to get an unauthenticated user's data
  it('\'/api/users/individual\' should respond with a 401 status code', (done) => {
    supertest(server)
    .get('/api/users/individual')
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to get another user's data
  it('\'/api/users/individual/champagne_papi\' should respond with logged in user\'s data', (done) => {
    agent
    .get('/api/users/individual/champagne_papi')
    .end((err, res) => {
      expect(res.body.username).equal('champagne_papi');
      expect(res.body.email).equal('carmar@gmail.com');

      done();
    });
  });


  // Test to have an unauthenticated user retrieve another user's data
  it('\'/api/users/individual/champagne_papi\' should respond with a 401 status code', (done) => {
    supertest(server)
    .get('/api/users/individual/champagne_papi')
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to edit a user's data
  it('\'/api/users/individual\' should respond with new user data', (done) => {
    const newData =  { username: 'ndogg', bio: 'I love scooby snacks' };
    newUser['username'] = 'ndogg';
    newUser['bio'] = 'I love scooby snacks';

    agent
    .put('/api/users/individual')
    .send(newData)
    .end((err, res) => {
      expect(res.body.username).equal(newUser.username);
      expect(res.body.bio).equal(newUser.bio);

      done();
    });
  });


  // Test to edit an unauthenticated user's info
  it('\'/api/users/individual\' should respond with a 401 status code', (done) => {
    const newData =  { username: 'ndogg', bio: 'I love scooby snacks' };
    newUser['username'] = 'ndogg';
    newUser['bio'] = 'I love scooby snacks';

    supertest(server)
    .put('/api/users/individual')
    .send(newData)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to delete a user
  it('\'/api/users/individual\' should respond with an object that contains the number of users deleted', (done) => {
    agent
    .delete('/api/users/individual')
    .end((err, res) => {
      expect(res.body).eql({ usersDeleted: 1 });

      done();
    });
  });


  // Test to delete an unauthenticated user
  it('\'/api/users/individual\' should respond with a 401 status code', (done) => {
    supertest(server)
    .delete('/api/users/individual')
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to create a new user with invalid email
  it('\'/api/users\' should respond with an array with an error message', (done) => {
    const newUser = { username: 'captain_crunch', email: 'captaincgmail.com', password: 'password', level: 'middle_school' };

    agent
    .post('/api/users')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.errorMessages[0]).equal('Email address is not valid');

      done();
    });
  });


  // Test to create a new user with username that already exist
  it('\'/api/users\' should respond with an array with an error message', (done) => {
    const newUser = { username: 'edumacate', email: 'hawk@gmail.com', password: 'password', level: 'other' };

    agent
    .post('/api/users')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.errorMessages[0]).equal('This username is already in use');

      done();
    });
  });


  // Test to create a new user with email that already exist
  it('\'/api/users\' should respond with an array with an error message', (done) => {
    const newUser = { username: 'trix_rabbit', email: 'nhaque@gmail.com', password: 'password', level: 'other' };

    agent
    .post('/api/users')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.errorMessages[0]).equal('This email is already in use');

      done();
    });
  });


  // Test to create a new user with password that is too short
  it('\'/api/users\' should respond with an array with an error message', (done) => {
    const newUser = { username: 'trix_rabbit', email: 'trix@gmail.com', password: 'cereal', level: 'other' };

    agent
    .post('/api/users')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.errorMessages[0]).equal('Password must be between 8 and 26 characters');

      done();
    });
  });
});
