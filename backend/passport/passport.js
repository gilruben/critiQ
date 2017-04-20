const passport = require('passport');
const jwtStrategy = require('./strategies/jwt.strategy');

const passportConfig = (app) => {
  app.use(passport.initialize());

  jwtStrategy(passport);
};

module.exports = passportConfig;
