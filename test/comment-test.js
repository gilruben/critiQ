const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const Comment = require('../backend/models').Comment;

describe('comment-api-test', () => {
  const comments = [
    { comment: 'Check your grammar.', textLocation: { 24: 'CRITIQ IS LITT' }, UserId: 1, DocumentId: 1 },
    { comment: "I'm confused. What does this mean?", textLocation: { 24: 'I love mocha, java and coffeescript. Best drinks ever!' }, UserId: 2, DocumentId: 1 },
  ];
  const postComment = { comment: 'This is an awkwardly phrased sentence.', textLocation: { 24: 'Eat chocolate like how chocolate should be eaten.' }, UserId: 2, DocumentId: 1 };

  before(() => Comment.sync({ force: true })
    .then(() => Comment.bulkCreate(comments))
    .catch(err => console.log('DB Err!', err)));

// Test to create a new comment
  it('/api/comments should respond with new data', (done) => {

    supertest(server)
      .post('/api/comments/')
      .send(postComment)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.comment).equal(postComment.comment);
        expect(res.body.textLocation).eql(postComment.textLocation);
        expect(res.body.UserId).equal(postComment.UserId);
        expect(res.body.DocumentId).equal(postComment.DocumentId);

        done();
      });
  });

// Test to update comment
  // it('/api/comments should respond with updated comments', (done) => {
  //   const updatedComment = { comment: "The 'b' shouldn't be capitalized here and that isn't an actual word." };
  //   const comment = "The 'b' shouldn't be capitalized here and that isn't an actual word.";

  //   supertest(server)
  //     .put('api/comments/1')
  //     .send(updatedComment)
  //     .end((err, res) => {
  //       expect(res.body).to.be.a('object');
  //       expect(res.body).to.have.key('comment');
  //       expect(res.body.comment).equal(updatedComment.comment);
  //       expect(res.body.comment).equal(comment);

  //       done();
  //     });
  // });

  // Test to delete comment
  // it('/api/comments should respond with a deletion message', (done) => {

  //   supertest(server)
  //     .delete('api/comments/1')
  //     .send('Successfully deleted!')
  //     .end((err, res) => {
  //       expect(res.message).to.equal('Comment successfully deleted');

  //       done();
  //     });
  // });
});
