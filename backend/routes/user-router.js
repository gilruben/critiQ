const router = require('express').Router();
const User = require('../models').User;

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
  const userData = req.body;

  User.create(userData)
  .then((user) => {
    res.send(user);
  });
};

const getOneUser = (req, res) => {
  const { userId } = req.session;

  User.findById(userId, {
    attributes: {
      exclude: ['password']
    }
  })
  .then((user) => {
    res.send(user);
  })
  .catch(() => {
    res.sendStatus(401);
  });
};

const editUserData = (req, res) => {
  const { userId } = req.session;
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
  const { userId } = req.session;

  User.destroy({
    where: {
      id: userId
    }
  })
  .then((delUser) => {
    res.send({ usersDeleted: delUser });
  });
};

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/individual')
  .get(getOneUser)
  .put(editUserData)
  .delete(deleteUser);

module.exports = router;
