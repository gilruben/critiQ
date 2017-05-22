const router = require('express').Router();
const Comment = require('../models').Comment;
const User = require('../models').User;
const authenticate = require('../passport/auth.js').authenticate('jwt', { session: false });

const commentRouter = () => {
  const postComment = (req, res) => {
    const userId = req.user.id;
    const newComment = req.body;
    newComment.UserId = userId;

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
    .catch(() => {
      res.sendStatus(500);
    });
  };

  const updateComment = (req, res) => {
    const userId = req.user.id;
    const commentId = req.params.id;
    const commentInfo = req.body;

    Comment.update(commentInfo, {
      where: {
        id: commentId,
        UserId: userId
      },
      returning: true
    })
    .then((updatedComment) => {
      const updatedCommentArray = updatedComment[1];
      const commentData = updatedCommentArray[0];

      res.send(commentData);
    })
    .catch(() => {
      res.sendStatus(500);
    });
  };

  const deleteComment = (req, res) => {
    const commentId = req.params.id;

    Comment.destroy({
      where: {
        id: commentId
      }
    })
    .then((commentDeleted) => {
      if (commentDeleted) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
  };

  router.route('/')
  .post(authenticate, postComment);

  router.route('/:id')
  .all(authenticate)
  .put(updateComment)
  .delete(deleteComment);

  return router;
};

module.exports = commentRouter();
