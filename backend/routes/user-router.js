const router = require('express').Router();
const User = require('../models').User;

const getAllUsers = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
  .then((users) => {
    res.send(users);
  });
};

router.route('/')
  .get(getAllUsers);


module.exports = router;
