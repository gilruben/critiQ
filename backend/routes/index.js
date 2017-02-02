const express = require('express');

const router = express.Router();

router.use('/users', require('./user-router'));
<<<<<<< HEAD
router.use('/documents', require('./document-router'));
// router.use('/comments', require('./comment-router'));
=======
// router.use('/document', require('./document-router'));
// router.use('/comment', require('./comment-router'));
>>>>>>> 39b3308c591959201ea1af2f9a90e940fc901bec

module.exports = router;
