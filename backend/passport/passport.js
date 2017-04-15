const passport = require('passport');
// const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');
// const User = require('../models').User;

const passportConfig = (app) => {
  // Passport
  app.use(passport.initialize());

  jwtStrategy(passport);
};

module.exports = passportConfig;
