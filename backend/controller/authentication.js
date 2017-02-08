const jwt = require('jwt-simple');
const User = require('../models/user-model');
const config = require('./config');

function userToken(user){
  const timeStamp = newDate().getTime
  console.log(config.secret)
  return jwt.encode({sub:user.id, iat: timeStamp}, config.secret)
};

exports.signIn=function(req, res, next){
  res.send({ token: userToken(req.user) });
};

exports.signUp=function(req, res, next){
  const username=req.body.username;
  const password=req.body.password;
  if(!username || !password){
    res.send('Enter Username AND Password');
	}
    User.findOne({
 	where: {
 		username: username
 	}
 }).then(function(err, info){
 	if (err){
      throw err
 	}
 	if (info){
 	res.send('Verified');
 	}
 	const user = User.create({ username: username, password:password })
	user.afterCreate(function(err){
	  if(err){
	  	throw err
	  }
	  res.json({ token:userToken(user) })
	});
 });
};
