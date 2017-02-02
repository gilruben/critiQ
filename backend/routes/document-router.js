// const router = require('express').Router();
// const Document = require('../models').Document;
// const Comment = require('../models').Comment;

// const getAllDocuments = (req, res) => {
//   console.log('eslint sucks');
//   Document.findAll()
//   .then((users) => {
//     console.log('GETALL', users);
//     res.send(users);
//   });
// };

// const documentCreate = (req, res) => {
//   const documentData = req.body;
//   Document.create(documentData)
//   .then((document) => {
//     res.send(document);
//   });
// };

// const getOneDocument = (req, res) => {
//   const id = req.params.id;
//   Document.findById(id, {
//     include: [Comment],
//   })
//   .then((user) => {
//     res.send(user);
//   });
// };

// router.route('/')
//   .get(getAllDocuments)
//   .post(documentCreate);

// router.route('/:id')
//   .get(getOneDocument);

// module.exports = router;
