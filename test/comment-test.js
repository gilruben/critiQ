const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../backend/server');
const agent = supertest.agent(server);
const Comment = require('../backend/models').Comment;

describe('comment-api-test', () => {
  const newComment = {
    comment: 'This doesn\'t need to be in bold',
    anchorKey: 'e5u27',
    anchorOffset: '128',
    focusKey: 'e5u27',
    focusOffset: '135',
    isBackward: false,
    hasFocus: true,
    UserId: 2,
    DocumentId: 4
  };
  let commentId;


  // Logs in user
  it('\'/auth/login\' will log in the user', (done) => {
    agent
    .post('/auth/login')
    .send({ email: 'nhaque@gmail.com', password: 'password' })
    .end((err, res) => {
      done();
    });
  });


  // Test to create a new comment
  it('\'/api/comments\' should respond with the comment created', (done) => {
    agent
    .post('/api/comments')
    .send(newComment)
    .end((err, res) => {
      expect(res.body).to.be.a('object');
      expect(res.body.comment).equal(newComment.comment);
      expect(res.body.textLocation).eql(newComment.textLocation);
      expect(res.body.UserId).equal(newComment.UserId);
      expect(res.body.DocumentId).equal(newComment.DocumentId);

      commentId = res.body.id;

      done();
    });
  });


  // Test to have an unauthenticated user create a new comment
  it('\'/api/comments\' should respond with the comment created', (done) => {
    supertest(server)
    .post('/api/comments')
    .send(newComment)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to update comment
  it('\'/api/comments/:id\' should respond with an updated comment', (done) => {
    const updatedComment = { comment: "This isn't an actual word." };

    agent
    .put(`/api/comments/${commentId}`)
    .send(updatedComment)
    .end((err, res) => {
      expect(res.body).to.be.a('object');
      expect(res.body.comment).equal(updatedComment.comment);

      done();
    });
  });


  // Test to have an unauthenticated user update comment
  it('\'/api/comments/:id\' should respond with status 401', (done) => {
    const updatedComment = { comment: "This isn't an actual word." };

    supertest(server)
    .put(`/api/comments/${commentId}`)
    .send(updatedComment)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to delete comment
  it('\'/api/comments/:id\' should respond with status 200', (done) => {
    agent
    .delete(`/api/comments/${commentId}`)
    .end((err, res) => {
      expect(res.status).equal(200);

      done();
    });
  });


  // Test to have an unauthenticated user delete a comment
  it('\'/api/comments/:id\' should respond with status 401', (done) => {
    supertest(server)
    .delete(`/api/comments/${commentId}`)
    .end((err, res) => {
      expect(res.status).equal(401);

      done();
    });
  });


  // Test to delete a nonexistent comment
  it('\'/api/comments/:id\' should respond with status 500', (done) => {
    agent
    .delete(`/api/comments/${321425}`)
    .end((err, res) => {
      expect(res.status).equal(500);

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
