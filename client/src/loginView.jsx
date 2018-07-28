import React from 'react';

const LoginView = ({registered}) => (
    <form id="login" name="login" method="post" action="login" className="column is-half is-offset-one-quarter">
    {
      registered ?
      <h4>Thanks for signing up! Please log in.</h4>
      :
      null
    }
        <label>Email Address: </label>
        <input className="text" name="email" type="text" />{' '}
        <label>Password: </label>
        <input name="password" type="password" /> {' '}
        <input className="button" type="submit" value="Log In" />
    </form>
);

export default LoginView;
