const router = require('express').Router();
const User = require('../models').User;
const passport = require('passport');
const authentication = require('../controller/authentication');
const passportFile = require('../passport-files/passport');
const reqAuth = passport.authenticate('jwt', { sessions: false });
const reqSignIn = passport.authenticate('local', { sessions: false });


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

const editUserData = (req, res) => {
  const userId = req.params.id;
  const sentData = req.body;
  const dataUsedForUpdate = {};

  const updatableColumns = ['username', 'email', 'password', 'bio', 'level'];
  const relevantDataToUpdate = [sentData.username, sentData.email,
    sentData.password, sentData.bio, sentData.level];

  relevantDataToUpdate.forEach((data, indx) => {
    const columnName = updatableColumns[indx];
    if (data) dataUsedForUpdate[columnName] = data;
  });

  User.update(dataUsedForUpdate, {
    where: {
      id: userId,
    },
    returning: true,
  })
  .then((user) => {
    const userArray = user[1];
    const userInstance = userArray[0];
    const userData = userInstance.dataValues;
    delete userData.password;

    res.send(userData);
  });
};

const deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((delUser) => {
    res.send({ usersDeleted: delUser });
  });
};

router.route('/auth')
  .post(reqSignIn, authentication.signIn);

router.route('/signup')
  .post(authentication.signUp);

router.route('/')
  .get(getAllUsers)
  .post(createUser);

// router.route('/:id')
//   .get(getOneUser)
//   .put(editUserData)
//   .delete(deleteUser);

module.exports = router;
