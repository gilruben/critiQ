const express = require('express');

const router = express.Router();

router.use('/users', require('./user-router'));
// router.use('/document', require('./document-router'));
// router.use('/comment', require('./comment-router'));

module.exports = router;
