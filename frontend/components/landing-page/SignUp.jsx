import React from 'react';

const SignUp = React.createClass({
  render() {
    return (
      <div className="sign-up">
        <form>
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <div className="student">
            <p>Are you a student?</p>
            <input type="radio" name="student" value="yes" /> Yes
            <input type="radio" name="student" value="no" /> No
            <select>
              <option value="middle">Middle school</option>
              <option value="high">High school</option>
              <option value="college">College</option>
              <option value="grad">Grad school</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  },
});

export default SignUp;
