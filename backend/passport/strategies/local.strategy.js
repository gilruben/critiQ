const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models').User;

const strategy = (passport) => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },

    (email, password, done) => {
      User.findOne({
        where: { email, password }
      })
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, null);
        }
      });
    })
  );
};

module.exports = strategy;
