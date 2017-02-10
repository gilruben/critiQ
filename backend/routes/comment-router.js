const router = require('express').Router();
const Comment = require('../models').Comment;

const postComment = (req, res) => {
  const comment = req.body;

  Comment.create(comment)
  .then((postedComment) => {
    res.send(postedComment);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

const updateComment = (req, res) => {
  const commentId = req.params.id;
  const commentInfo = req.body;

  Comment.update(commentInfo, {
    where: {
      id: commentId,
    },
    returning: true,
  })
  .then((updatedComment) => {
    const updatedCommentArray = updatedComment[1];
    const commentData = updatedCommentArray[0];

    res.send(commentData);
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
    res.send({ message: 'Comment successfully deleted.' });
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
