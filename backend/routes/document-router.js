const router = require('express').Router();
const Document = require('../models').Document;
const Comment = require('../models').Comment;

const getAllDocuments = (req, res) => {
  Document.findAll()
  .then((users) => {
    res.send(users);
  });
};

const documentCreate = (req, res) => {
  // req.body will include userId
  const documentData = req.body;
  Document.create(documentData)
  .then((doc) => {
    res.send(doc);
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getOneDocument = (req, res) => {
  const id = req.params.id;
  Document.findById(id, {
    include: [Comment],
  })
  .then((user) => {
    res.send(user);
  });
};

router.route('/')
  .get(getAllDocuments)
  .post(documentCreate);

router.route('/:id')
  .get(getOneDocument);

module.exports = router;
