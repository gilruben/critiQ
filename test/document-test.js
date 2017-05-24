const expect = require('chai').expect;
const supertest = require('supertest');
const moment = require('moment');
const server = require('../backend/server');
const agent = supertest.agent(server);
const documentSeeds = require('../backend/seeders/document-seeds');
const Document = require('../backend/models').Document;

describe('document-api-test', () => {
  let testDocumentId;

  // Logs in user
  it('\'/auth/login\' will log in the user', (done) => {
    agent
    .post('/auth/login')
    .send({ email: 'nhaque@gmail.com', password: 'password' })
    .end((err, res) => {
      done();
    });
  });


  // Test to get all documents
  it('\'/api/documents\' should respond with all documents that are public and active', (done) => {
    agent
    .get('/api/documents')
    .end((err, res) => {
      expect(res.body.length).equal(5);

      done();
    });
  });


  // Test to have an authenticated user get all documents
  it('\'/api/documents\' should respond with all documents that are public and active', (done) => {
    supertest(server)
    .get('/api/documents')
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  const deadline = moment().format().slice(0, 10)
  const newDocument = { title: 'Infinite Looo-', body: documentSeeds[4], category: 'resume', privacy: 'public', deadline, active: true};

  // Test to create a new document
  it('\'/api/documents\' should respond with the document created', (done) => {
    agent
    .post('/api/documents')
    .send(newDocument)
    .end((err, res) => {
      expect(res.body.title).equal(newDocument.title);
      expect(res.body.body).eql(newDocument.body);
      expect(res.body.category).equal(newDocument.category);
      expect(res.body.privacy).equal(newDocument.privacy);
      expect(res.body.active).equal(newDocument.active);

      testDocumentId = res.body.id;

      done();
    });
  });


  // Test to have an authenticated user create a new document
  it('\'/api/documents\' should respond with the document created', (done) => {
    supertest(server)
    .post('/api/documents')
    .send(newDocument)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to get a specific document
  it('\'/api/documents/:id\' should respond with a specific document', (done) => {
    agent
    .get(`/api/documents/${testDocumentId}`)
    .end((err, res) => {
      expect(res.body.id).equal(testDocumentId);
      expect(res.body.title).equal(newDocument.title);
      expect(res.body.body).eql(newDocument.body);
      expect(res.body.category).equal(newDocument.category);
      expect(res.body.privacy).equal(newDocument.privacy);
      expect(res.body.active).equal(newDocument.active);

      done();
    });
  });


  // Test to have an unauthenticated user get a specific document
  it('\'/api/documents/:id\' should respond with a specific document', (done) => {
    supertest(server)
    .get(`/api/documents/${testDocumentId}`)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to create a new document with incorrect type on body field.
  it('\'/api/documents\' should respond with an object with an array containing an error message', (done) => {
    const newDocument = { title: 'That Time I NPMed No-Demon', body: 'foobar', category: 'essay', privacy: 'public', deadline, active: true };

    agent
    .post('/api/documents')
    .send(newDocument)
    .end((err, res) => {
      expect(res.status).equal(400);
      expect(res.body).eql({ errorMessages: ['The body field must be a JSON object'] });

      done();
    });
  });


  // Test to create a new document with invalid value on privacy field.
  it('\'/api/documents\' should respond with an object with an array containing an error message', (done) => {
    const newDocument = { title: 'That Time I NPMed No-Demon', body: documentSeeds[2], category: 'essay', privacy: 'secret', deadline, active: true };

    agent
    .post('/api/documents')
    .send(newDocument)
    .end((err, res) => {
      expect(res.status).equal(400);
      expect(res.body).eql({ errorMessages: ['Invalid value passed to privacy field'] });

      done();
    });
  });


  // Test to update single document by id.
  it('\'/api/documents/:id\' should respond with new body data', (done) => {
    const newData = { body: documentSeeds[1]};

    agent
    .put(`/api/documents/${testDocumentId}`)
    .send(newData)
    .end((err, res) => {
      expect(res.body.body).eql(documentSeeds[1]);

      done();
    });
  });


  // Test GET query with category
  it('\'/api/documents\' should respond with category query', (done) => {
    agent
    .get('/api/documents?category=essay')
    .end((err, res) => {
      expect(res.body.length).equal(4);

      done();
    });
  });


  // Test to delete single document by id.
  it('\'/api/documents/:id\' should respond with an object containing the number of documents deleted', (done) => {
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
});
