const passport = require('passport');
const jwtStrategy = require('./strategies/jwt.strategy');

const passportConfig = (app) => {
  // Passport
  app.use(passport.initialize());

  jwtStrategy(passport);
};

module.exports = passportConfig;
