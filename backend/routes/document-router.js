const router = require('express').Router();
const Document = require('../models').Document;
const Comment = require('../models').Comment;
const User = require('../models').User;
const authenticate = require('../passport/auth.js').authenticate('jwt', { session: false });
const translateErrors = require('../utilities/error-translator');

const documentRouter = () => {
  const getAllDocuments = (req, res) => {
    const query = req.query;
    const category = query.category;
    const level = query.level;
    const sequelizeQuery = {
      where: {
        active: true,
        privacy: 'public'
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email']
          }
        }
      ]
    };

    // if category exists in URL query it will place category:category directly into query.
    if (category) {
      sequelizeQuery.where.category = category;
    }
    // if level exists in URL query it will place level:level directly into query.
    if (level) {
      sequelizeQuery.include[0].where = {};
      sequelizeQuery.include[0].where.level = level;
    }

    Document.findAll(sequelizeQuery)
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const documentCreate = (req, res) => {
    const documentData = req.body;
    const userId = req.user.id;
    documentData.UserId = userId;

    Document.create(documentData)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      // Location of error messages is different when using custom validations.
      // The only custom validation used was for checking the type of the body field.
      // The error message for the custom validation is 'Validation error: Incorrect
      // type', so if that message appears, then the array of error messages that
      // we're trying to access is stored in a different location then normal.
      const errors = (err.message === 'Validation error: Incorrect type') ? err.errors[0].value.errors : err.errors;
      const errorMessages = { errorMessages: translateErrors(errors) };

      res.status(400).send(errorMessages);
    });
  };

  const getSingleDocument = (req, res) => {
    const id = req.params.id;

    Document.findById(id, {
      where: {
        privacy: 'public'
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: {
              exclude: ['password', 'email', 'level']
            }
          }
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'email', 'level']
          }
        }
      ]
    })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const editSingleDocument = (req, res) => {
    const userId = req.user.id;

    Document.update(req.body, {
      where: {
        id: req.params.id,
        UserId: userId
      },
      returning: true
    })
    .then((doc) => {
      const documentBody = doc[1];
      const documentArray = documentBody[0];
      const documentData = documentArray.dataValues;

      res.send(documentData);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const deleteSingleDocument = (req, res) => {
    const userId = req.user.id;

    Document.destroy({
      where: {
        id: req.params.id,
        UserId: userId
      }
    })
    .then((doc) => {
      res.send({ documentsDeleted: doc });
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  router.route('/')
  .all(authenticate)
  .get(getAllDocuments)
  .post(documentCreate);

  router.route('/:id')
  .all(authenticate)
  .get(getSingleDocument)
  .put(editSingleDocument)
  .delete(deleteSingleDocument);

  return router;
};


module.exports = documentRouter();
