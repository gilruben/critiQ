const router = require('express').Router();
const User = require('../models').User;

const userLogin = (req, res) => {
  const userData = req.body;
  User.findOne({
    where: userData
  })
  .then((user) => {
    if (user) {
      req.session.userId = user.id;
      req.session.save;
    }
  })
  .catch(() => {
    res.status(401).send('Login Failed!');
  });
};

//useraccount add session 

const userLogout = (req, res) => {
  req.session.destroy();
  res.send('Logout successful.');
};

const checkLoginStatus = (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    User.findById(userId)
    .then((user) => {
      if (user) {
        res.sendStatus(200);
      }
    });
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
