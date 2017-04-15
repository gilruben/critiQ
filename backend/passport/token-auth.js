const jwt = require('jsonwebtoken');


const tokenFuncs = () => {
  const secret = 'English Master Manipulator';
  const options = {
    audience: 'litclub.herokuapp.com',
    issuer: 'critiq',
    expiresIn: '90 days'
  };

  const sign = (payload) => {
    if (!payload && typeof payload !== 'object' && !Array.isArray(payload)) {
      return new Error('payload must be an object');
    }

    return jwt.sign(payload, secret, options);
  };

  // const verify = (token) => {
  //   // return jwt.verify(token, secret, options);
  // };

  return { sign };
};

module.exports = tokenFuncs();
