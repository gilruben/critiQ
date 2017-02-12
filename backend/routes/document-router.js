const router = require('express').Router();
const Document = require('../models').Document;
const Comment = require('../models').Comment;
const User = require('../models').User;

const getAllDocuments = (req, res) => {
  const query = req.query;
  const category = query.category;
  const level = query.level;
  const sequelizeQuery = {
    where: {
      active: true,
      privacy: 'public',
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'email'],
        },
      },
    ],
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

  Document.create(documentData)
  .then((doc) => {
    res.send(doc);
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getSingleDocument = (req, res) => {
  const id = req.params.id;

  Document.findById(id, {
    include: [Comment],
  })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const editSingleDocument = (req, res) => {
  Document.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
  .then((doc) => {
    const documentBody = doc[1];
    const documentArray = documentBody[0];
    const documentData = documentArray.dataValues;

    res.send(documentData.body);
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const deleteSingleDocument = (req, res) => {
  Document.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((doc) => {
    res.send({ documentsDeleted: doc });
  })
  .catch((err) => {
    console.log(err.message);
  });
};

router.route('/')
  .get(getAllDocuments)
  .post(documentCreate);

router.route('/:id')
  .get(getSingleDocument)
  .put(editSingleDocument)
  .delete(deleteSingleDocument);

module.exports = router;
