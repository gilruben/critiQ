import React from 'react';

const SignUp = React.createClass({
  render() {
    return (
      <div className="sign-up">
        <h1 className="sign-up-header">Hello! Let{"'"}s get to know you.</h1>
        <form>
          <input className="sign-up-input" type="text" placeholder="Pick a username" />
          <input className="sign-up-input" type="email" placeholder="Your email" />
          <input className="sign-up-input" type="password" placeholder="A password" />
          <div className="student">
            <p className="student-question" >Are you a student?</p>
            <input type="radio" name="student" id="yes" value="yes" />
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="student" id="no" value="no" />
            <label htmlFor="no">No</label>
            <select>
              <option value="middle">Middle school</option>
              <option value="high">High school</option>
              <option value="college">College</option>
              <option value="grad">Grad school</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button className="sign-up-button" type="submit">Create</button>
        </form>
      </div>
    );
  },
});

export default SignUp;
