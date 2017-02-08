const passport = require('passport');
const User = require('../models/user-model');
const config = require('../controller/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

const localOptions = {usernameField: 'username'};
const localLogin = new localStrategy(localOptions, function(username, password, done){
  User.findOne({
  	where:{
  		username: username
  	}
  }).then(function(err, user){
  	if (err){
  		throw err
  	}
  	if (!user) {
  		return done(null, false)
  	}
  	user.comparePassword(password,function(err,ismatch){
  		if (err){
  			throw err
  		}
  		if (!ismatch){
  			return done(null, false)
  		}
  		return done(null, user)
  	})
  })
});

const jwtOptions = { jwtFromReq: ExtractJwt.fromHeader('authorization'), secretOrKey: config.secret };

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	User.findOne({
		where: {
		id: payload.sub
	}
	}).then(function(err,user){
		if(err){
			throw err
		}
		if(user){
			done(null, user)
		}
		else{
			done(null, false)
		}
	})
});

passport(jwtLogin);
passport(localLogin);
