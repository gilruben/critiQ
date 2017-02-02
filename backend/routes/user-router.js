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

const createUser = (req, res) => {
  const userData = req.body;

  User.create(userData)
  .then((user) => {
    res.send(user);
  });
};

const getOneUser = (req, res) => {
  const id = req.params.id;
  User.findById(id, {
    attributes: {
      exclude: ['password'],
    },
  })
  .then((user) => {
    res.send(user);
  });
};

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getOneUser);

module.exports = router;
