const router = require('express').Router();
const Comment = require('../models').Comment;

const postComment = (req, res) => {
  const comment = req.body;
  Comment.create({ comment })
  .then((postedComment) => {
    console.log('POSTED COMMENT =>', postedComment)
    res.send(postedComment);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

const updateComment = (req, res) => {
  const commentId = req.params.id;
  const commentInfo = req.body.comment;
  Comment.findById(commentId)
  .then(() => {
    Comment.update({
      comment: commentInfo,
    });
  })
  .then((updatedComment) => {
    res.send(updatedComment);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

const deleteComment = (req, res) => {
  const commentId = req.params.id;
  Comment.destroy({
    where: {
      id: commentId,
    },
  })
  .then(() => {
    res.send('Comment successfully deleted.');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

router.route('/')
  .post(postComment);

router.route('/:id')
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
