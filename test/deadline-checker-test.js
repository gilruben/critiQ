const expect = require('chai').expect;
const supertest = require('supertest');
const moment = require('moment');
const server = require('../backend/server');
const agent = supertest.agent(server);
const documentSeeds = require('../backend/seeders/document-seeds');
const Document = require('../backend/models').Document;
const deadlineChecker = require('../backend/utilities/deadline-checker');

describe('deadline-checker-test', () => {
  const dateTimeNow = moment();
  const deadlineCheckTime = moment().add(2, 'seconds')
  const deadline = dateTimeNow.subtract(1, 'day').format().slice(0, 10);

  // Hours, Mins, and Secs, in number form, at which the deadline checker will
  // perform the check
  const hours = deadlineCheckTime.hour();
  const mins = deadlineCheckTime.minute();
  const secs = deadlineCheckTime.seconds();

  // Hours, Mins, and Secs, in string form, at which the deadline checker will
  // perform the check
  const checkHours = (hours < 10) ? '0' + hours : hours.toString();
  const checkMins = (mins < 10) ? '0' + mins : mins.toString();
  const checkSecs = (secs < 10) ? '0' + secs : secs.toString();

  const testDocument = {
    title: 'Infinite Looo-',
    body: documentSeeds[4],
    category: 'essay',
    privacy: 'public',
    deadline,
    active: true,
    UserId: 1
  };

  let testDocumentId;

  // Logs in user
  it('Will log in the user', (done) => {
    agent
    .post('/auth/login')
    .send({ email: 'nhaque@gmail.com', password: 'password' })
    .end((err, res) => {
      done();
    });
  });


  // Test to create a new document
  it('Should respond with the document created', (done) => {
    agent
    .post('/api/documents')
    .send(testDocument)
    .end((err, res) => {
      expect(res.body.title).equal(testDocument.title);
      expect(res.body.body).eql(testDocument.body);
      expect(res.body.category).equal(testDocument.category);
      expect(res.body.privacy).equal(testDocument.privacy);
      expect(res.body.active).equal(testDocument.active);

      testDocumentId = res.body.id;

      done();
    });
  });


  // Check deadlines in two seconds
  it('Will move all documents that have reached their deadlines, from active to inactive', (done) => {
    deadlineChecker(`${checkSecs} ${checkMins} ${checkHours} * * 0-6`);

    setTimeout(function () {
      done();
    }, 2000);
  }).timeout(3000);


  // Test to get the document previously created with its active field set to false
  it('Should respond with the previously created document with active field set to false', (done) => {
    agent
    .get(`/api/documents/${testDocumentId}`)
    .end((err, res) => {
      expect(res.body.id).equal(testDocumentId);
      expect(res.body.title).equal(testDocument.title);
      expect(res.body.body).eql(testDocument.body);
      expect(res.body.category).equal(testDocument.category);
      expect(res.body.privacy).equal(testDocument.privacy);
      expect(res.body.active).equal(false);

      done();
    });
  });

  // Test to delete the document that was created.
  it('Should respond with an object containing the number of documents deleted', (done) => {
    agent
    .delete(`/api/documents/${testDocumentId}`)
    .end((err, res) => {
      expect(res.body).eql({ documentsDeleted: 1 });

      done();
    });
  });


  // Logs user out
  it('\'/auth/login\' should respond with status 200', (done) => {
    agent
    .post('/auth/logout')
    .end((err, res) => {
      expect(res.status).equal(200);

      done();
    });
  });
})
