const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const Document = require('../backend/models').Document;

describe('document-api-test', () => {
  // Fake document data that we'll use for tests
  const documents = [
    { title: 'No Spear, Just Shake', body: { foo: 'bar' }, category: 'Jr. High', privacy: 'public', deadline: new Date(Date.UTC(2017, 4, 20, 3, 0, 0)), active: true, UserId: 1 },
    { title: 'Dude, I Lost My For-Loop', body: { foo: 'bar' }, category: 'Dissertation', privacy: 'private', deadline: new Date(Date.UTC(2017, 3, 20, 3, 0, 0)), active: true, UserId: 2 },
    { title: 'When Bad and Bourgeois Meets Good and Humble', body: { foo: 'bar' }, category: 'Resume', privacy: 'public', deadline: new Date(Date.UTC(2017, 4, 17, 3, 0, 0)), active: false, UserId: 3 },
  ];


  before(() => Document.sync({ force: true })
    .then(() => Document.bulkCreate(documents))
    .catch(err => console.log('DB Err!', err)));

  // Test to get all documents route
  it('\'/api/documents\' should respond with all documents', (done) => {
    supertest(server)
      .get('/api/documents')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].title).equal(documents[0].title);
        expect(res.body[1].title).equal(documents[1].title);
        expect(res.body[2].title).equal(documents[2].title);

        done();
      });
  });

  // Test to create a new document
  it('\'/api/documents\' should respond with the document created', (done) => {
    const newDocument = { title: 'Infinite Looo-', body: { foo: 'bar' }, category: 'Resume', privacy: 'public', deadline: new Date(Date.UTC(2017, 4, 17, 3, 0, 0)), active: true, UserId: 1 };

    supertest(server)
      .post('/api/documents')
      .send(newDocument)
      .end((err, res) => {
        expect(res.body.title).equal(newDocument.title);
        expect(res.body.body).eql(newDocument.body);
        expect(res.body.category).equal(newDocument.category);
        expect(res.body.privacy).equal(newDocument.privacy);
        expect(res.body.active).equal(newDocument.active);

        done();
      });
  });

  // Test to get a specific document
  it('\'/api/documents/:id\' should respond with a specific document', (done) => {
    supertest(server)
    .get('/api/documents/1')
    .end((err, res) => {
      expect(res.body.id).equal(1);
      expect(res.body.title).equal(documents[0].title);
      expect(res.body.body).eql(documents[0].body);
      expect(res.body.category).equal(documents[0].category);
      expect(res.body.privacy).equal(documents[0].privacy);
      expect(res.body.active).equal(documents[0].active);

      done();
    });
  });

  // Test to create a new document with validation error for body.
  it('\'/api/documents\' should respond with an error', (done) => {
    const newDocument = { title: 'That Time I NPMed No-Demon', body: 'foobar', category: 'Essay', privacy: 'public', deadline: new Date(Date.UTC(2016, 11, 20, 3, 0, 0)), active: true, UserId: 2 };

    supertest(server)
      .post('/api/documents')
      .send(newDocument)
      .end((err, res) => {
        expect(res.body.body).eql(newDocument.body);

        done();
      });
  });

  // Test to delete single document by id.
  it('\'/api/documents/:id\' should respond an object', (done) => {

    supertest(server)
      .delete('/api/documents/4')
      .end((err, res) => {
        expect(res.body).eql({ documentsDeleted: 1 });

        done();
      });
  });

  // Test to update single document by id.
  it('\'/api/documents/:id\' should respond with new body data', (done) => {
    const newData = { body: { foo: 'bar2' } };

    supertest(server)
    .put('/api/documents/1')
    .send(newData)
    .end((err, res) => {
      expect(res.body).eql(newData.body);

      done();
    });
  });
});
