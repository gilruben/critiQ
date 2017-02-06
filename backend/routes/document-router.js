const router = require('express').Router();
const Document = require('../models').Document;
const Comment = require('../models').Comment;

const getAllDocuments = (req, res) => {
  Document.findAll()
  .then((users) => {
    res.send(users);
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
