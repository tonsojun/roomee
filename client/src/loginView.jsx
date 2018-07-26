import React from 'react';

const LoginView = ({registered}) => (
    <form id="login" name="login" method="post" action="login">
    {
      registered ?
      <h4>Thanks for signing up! Please log in.</h4>
      :
      null
    }
        <label for="email">Email Address: </label>
        <input class="text" name="email" type="text" />{' '}
        <label for="password">Password: </label>
        <input name="password" type="password" /> {' '}
        <input class="btn" type="submit" value="Log In" />
    </form>
);

export default LoginView;