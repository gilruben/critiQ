const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models').User;

const strategy = (passport) => {
  const extractor = (req) => {
    let token = null;

    if (req.session && req.session.jwt) {
      token = req.session.jwt;
    }

    return token;
  };

  const options = {};
  options.jwtFromRequest = ExtractJwt.fromExtractors([extractor]);
  options.secretOrKey = 'English Master Manipulator';
  options.issuer = 'critiq';
  options.audience = 'litclub.herokuapp.com';

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    console.log('PAYLOAD:', jwtPayload);
    done(null, { id: jwtPayload.id });
  }));
};

module.exports = strategy;
