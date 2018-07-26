import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const SignUpView = () => (
  <div>
    <form id="signUp" name="signUp" method="post" action="/signUp">
      <label htmlFor="email">
      Email Address:
      </label>
      <input className="text" name="email" type="email" />
      {' '}
      <label htmlFor="firstname">
        Firstname:
      </label>
      <input name="firstname" type="text" />
      {' '}
      <label htmlFor="lastname">
      Lastname:
      </label>
      <input name="lastname" type="text" />
      {' '}
      <label htmlFor="password">
      Password:
      </label>
      <input name="password" type="password" />
      {' '}
      <Link to="/loginView" style={{ textDecoration: 'none', color: '#888' }}>
        <input className="btn" type="submit" value="Sign Up" />
      </Link>
    </form>
  </div>
);

export default SignUpView;