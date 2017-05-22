const router = require('express').Router();
const User = require('../models').User;
const authFuncs = require('../passport/auth');

const authenticate = authFuncs.authenticate('jwt', { session: false });

const userLogin = (req, res) => {
  const { email, password } = req.body;
  const userData = { email, password };

  User.findOne({
    where: userData,
    attributes: {
      exclude: ['password']
    }
  })
  .then((user) => {
    if (user) {
      const signToken = authFuncs.sign;

      req.session.jwt = signToken({ id: user.id });
      req.session.save();

      res.send(user);
    } else {
      res.sendStatus(401);
    }
  })
  .catch(() => {
    res.sendStatus(401);
  });
};

const userLogout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const checkLoginStatus = (req, res) => {
  res.send(200);
};

router.route('/login')
  .post(userLogin);

router.route('/logout')
  .post(authenticate, userLogout);

router.route('/verify')
  .get(authenticate, checkLoginStatus);

module.exports = router;
