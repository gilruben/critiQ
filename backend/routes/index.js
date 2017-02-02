const express = require('express');

const router = express.Router();

router.use('/users', require('./user-router'));
// router.use('/documents', require('./document-router'));
router.use('/comments', require('./comment-router'));

module.exports = router;
