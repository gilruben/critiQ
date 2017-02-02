// const expect = require('chai').expect;
// const supertest = require('supertest');
// const server = require('../backend/server');
// const Document = require('../backend/models').Document;

// describe('document-api-test', () => {
//   // Fake document data that we'll use for tests
//   const documents = [
//     { title: 'No Spear, Just Shake', body: {foo:'bar'}, category: 'Jr. High', privacy: 'public', deadline: new Date(2017-04-20), active: true },
//     { title: 'Dude, I Lost My For-Loop', body: {foo:'bar'}, category: 'Dissertation', privacy: 'private', deadline: new Date(2017-03-18), active: true },
//     { title: 'When Bad and Bourgeois Meets Good and Humble', body: {foo:'bar'}, category: 'Resume', privacy: 'public', deadline: new Date(2017-03-21), active: false },
//   ];


//   before(() => Document.sync({ force: true })
//     .then(() => Document.bulkCreate(documents))
//     .catch(err => console.log('DB Err!', err)));

//   // Test to get all documents route
//   it('\'/api/documents\' should respond with all documents', (done) => {
//     supertest(server)
//       .get('/api/documents')
//       .end((err, res) => {
//         expect(res.body.length).equal(3);
//         expect(res.body[0].title).equal(documents[0].title);
//         expect(res.body[1].title).equal(documents[1].title);
//         expect(res.body[2].title).equal(documents[2].title);

//         done();
//       });
//   });

  // // Test to create a new document
  // it('\'/api/documents\' should respond with the document created', (done) => {
  //   const newDocument = { title: 'Infinite Loooo-', body: {foo:'bar'}, category: 'High School', privacy: 'private', deadline: new Date(2017-02-21), active: true };

  //   supertest(server)
  //     .post('/api/documents')
  //     .send(newDocument)
  //     .end((err, res) => {
  //       expect(res.body.title).equal(newDocument.title);
  //       expect(res.body.body).equal(newDocument.body);
  //       expect(res.body.category).equal(newDocument.category);
  //       expect(res.body.privacy).equal(newDocument.privacy);
  //       expect(res.body.deadline).equal(newDocument.deadline);
  //       expect(res.body.active).equal(newDocument.active);

  //       done();
  //     });
  // });

  // // Test to get a specific document
  // it('\'/api/documents/:id\' should respond with a specific document', (done) => {
  //   supertest(server)
  //   .get('/api/documents/1')
  //   .end((err, res) => {
  //     expect(res.body.id).equal(1);
  //     expect(res.body.title).equal(documents[0].title);
  //     expect(res.body.body).equal(documents[0].body);
  //     expect(res.body.category).equal(documents[0].category);
  //     expect(res.body.privacy).equal(documents[0].privacy);
  //     expect(res.body.deadline).equal(documents[0].deadline);
  //     expect(res.body.active).equal(documents[0].active);

  //     done();
  //   });
  // });

  // // Test to create a new user with invalid EVERYTHING
  // it('\'/api/documents\' should respond with an error', (done) => {
  //   const newDocument = { title: 'That Time I NPMed No-Demon '+ 3, body: 'foo: bar', category: 'Essay', privacy: 'pooblic', deadline: new Date(1017-02-21), active: 'yes' };

  //   supertest(server)
  //     .post('/api/documents')
  //     .send(newDocument)
  //     .end((err, res) => {
  //       expect(res.body.username).equal(newDocument.username);
  //       expect(res.body.email).equal(newDocument.email);
  //       expect(res.body.password).equal(newDocument.password);
  //       expect(res.body.bio).equal(newDocument.bio);

  //       done();
  //     });
  // });

  // // Test to create a new user with username and email that already exist
  // it('\'/api/documents\' should respond with an error', (done) => {
  //   const newDocument = { title: 'When Bad and Bourgeois Meets Good and Humble', body: {foo:'bar'}, category: 'Resume', privacy: 'public', deadline: new Date(2017-03-21), active: false };

  //   supertest(server)
  //     .post('/api/documents')
  //     .send(newDocument)
  //     .end((err, res) => {
  //       expect(res.body.username).equal(newDocument.username);
  //       expect(res.body.email).equal(newDocument.email);
  //       expect(res.body.password).equal(newDocument.password);
  //       expect(res.body.bio).equal(newDocument.bio);

  //       done();
  //     });
  // });

// });
