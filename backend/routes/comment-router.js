const router = require('express').Router();
const Comment = require('../models').Comment;
const User = require('../models').User;

const postComment = (req, res) => {
  const newComment = req.body;

  Comment.create(newComment)
  .then((postedComment) => {
    const id = postedComment.id;

    return Comment.findById(id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email', 'level']
          }
        }
      ]
    });
  })
  .then((comment) => {
    res.send(comment);
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
      id: commentId
    },
    returning: true
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
      id: commentId
    }
  })
  .then(() => {
    res.sendStatus(200);
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
