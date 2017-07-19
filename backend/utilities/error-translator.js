/**
* Translates an array of error messages into an array of messages that can be
* displayed on the front end
*
* @param {Object[]} errorArr - Array of objects with error information
*
* @returns {Object[]}  Array of strings with error messages tailored for
*                          front end display
*/
const translateErrors = (errorArr) => {
  const errMessages = [];

  errorArr.forEach((error) => {
    // Attribute is the model attribute that the error message corresponds to
    const { message } = error;
    const attribute = error.path;
    let newMessage = '';

    switch (message) {
      case 'Validation isEmail failed':
        newMessage = 'Email address is not valid';
        break;
      case `${attribute} must be unique`:
        newMessage = `This ${attribute} is already in use`;
        break;
      case 'Validation len failed':
        if (attribute === 'password') {
          newMessage = 'Password must be between 8 and 26 characters';
        } else if (attribute === 'username') {
          newMessage = 'Username must be between 3 and 20 characters';
        }

        break;
      case 'body must be a JSON object':
        newMessage = 'The body field must be a JSON object';
        break;
      case 'Validation isIn failed':
        newMessage = `Invalid value passed to ${attribute} field`;
        break;
      default:
        break;
    }

    // if a new message is produced, it will get added to the errMessages array
    if (newMessage) errMessages.push(newMessage);
  });

  return errMessages;
};

module.exports = translateErrors;
