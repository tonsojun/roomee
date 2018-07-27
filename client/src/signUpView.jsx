import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const SignUpView = ({onSignUp}) => (
  <div className="columns section level">
    <form className="column level-item is-narrow is-offset-5" id="signUp" name="signUp" method="post" action="/signUp">
      <div className="field">
        <label className="label" htmlFor="email">
        Email Address:
        </label>
        <div className="control">
          <input className="input text" name="email" type="email" />
          {' '}
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="firstname">
          Firstname:
        </label>
        <div className="control">
          <input className="input" name="firstname" type="text" />
          {' '}
        </div>
      </div>
      <div className="field">
      <label className="label" htmlFor="lastname">
      Lastname:
      </label>
      <div className="control">
      <input className="input" name="lastname" type="text" />
      {' '}
      </div>
      </div>
      <div className="field">
      <label className="label" htmlFor="password">
      Password:
      </label>
      <div className="control">
      <input className="input" name="password" type="password" />
      {' '}
      </div>
      </div>
      <Link to="/loginView" style={{ textDecoration: 'none', color: '#888' }}>
        <input onClick={onSignUp} className="btn button" type="submit" value="Sign Up" />
      </Link>
    </form>
  </div>
);

export default SignUpView;