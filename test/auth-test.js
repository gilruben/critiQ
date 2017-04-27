const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const agent = supertest.agent(server);

describe('auth-api-test', () => {
  // Test to see if user can login
  it('\'/auth/login\' should respond with status 200', (done) => {
    agent
    .post('/auth/login')
    .send({ email: 'nhaque@gmail.com', password: 'password' })
    .end((err, res) => {
      expect(res.status).equal(200);

      done();
    });
  });

  // Test to see if user can logout
  it('\'/auth/login\' should respond with status 200', (done) => {
    agent
    .post('/auth/logout')
    .end((err, res) => {
      expect(res.status).equal(200);

      done();
    });
  });

  // Test to see if user with incorrect login credentials can log in
  it('\'/auth/login\' should respond with status 401', (done) => {
    agent
    .post('/auth/login')
    .send({ email: 'nhaque@gmail.com', password: 'pass' })
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });
})
