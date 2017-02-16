const router = require('express').Router();
const User = require('../models').User;

const userLogin = (req, res) => {
  const userData = req.body;
  User.findOne({
    where: userData
  })
  .then((user) => {
    if (user) {
      req.session.username = user.username;
      req.session.userId = user.id;
      req.session.save;
    }
  })
  .catch(() => {
    res.status(401).send('Login Failed!');
  });
};

const userLogout = (req, res) => {
  req.session.destroy();
  res.send('Logout successful.');
};

const checkLoginStatus = (req, res) => {
  const username = req.session.username;
  if (username) {
    User.findOne({
      where: {
        username
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401).send('Verification failed.');
  }
};

router.route('/login')
  .get(userLogin);

router.route('/logout')
  .post(userLogout);

router.route('/verify')
  .get(checkLoginStatus);

module.exports = router;
