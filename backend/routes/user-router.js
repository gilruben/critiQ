const router = require('express').Router();
const User = require('../models').User;
const Document = require('../models').Document;
const authFuncs = require('../passport/auth');
const authenticate = require('../passport/auth.js').authenticate('jwt', { session: false });
const translateErrors = require('../utilities/error-translator');

const userRouter = () => {
  const getAllUsers = (req, res) => {
    User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    .then((users) => {
      res.send(users);
    });
  };

  const createUser = (req, res) => {
    const { username, email, password, level } = req.body;
    const userData = { username, email, password, level };

    User.create(userData)
    .then((user) => {
      const signToken = authFuncs.sign;

      req.session.jwt = signToken({ id: user.id });
      req.session.save();

      res.send(user);
    })
    .catch((err) => {
      const errors = err.errors;
      const errorMessages = { errorMessages: translateErrors(errors) };

      res.status(400).send(errorMessages);
    });
  };

  const getOneUser = (req, res) => {
    const userId = req.user.id;

    User.findById(userId, {
      attributes: {
        exclude: ['password']
      },
      include: [Document]
    })
    .then((user) => {
      res.send(user);
    });
  };

  const editUserData = (req, res) => {
    const userId = req.user.id;
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
        id: userId
      },
      returning: true
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
    const userId = req.user.id;

    User.destroy({
      where: {
        id: userId
      }
    })
    .then((delUser) => {
      req.session.destroy();
      res.send({ usersDeleted: delUser });
    });
  };

  router.route('/')
    .get(authenticate, getAllUsers)
    .post(createUser);

  router.route('/individual')
    .all(authenticate)
    .get(getOneUser)
    .put(editUserData)
    .delete(deleteUser);

  return router;
};

module.exports = userRouter();
