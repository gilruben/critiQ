const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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
  options.secretOrKey = process.env.SECRET || 'English Master Manipulator';
  options.issuer = process.env.ISSUER || 'litclub.herokuapp.com';
  options.audience = process.env.AUDIENCE || 'litclub.herokuapp.com';

  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    if (jwtPayload) {
      done(null, { id: jwtPayload.id });
    } else {
      done(null, false);
    }
  }));
};

module.exports = strategy;
