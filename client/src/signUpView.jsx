import React from 'react';

const SignUpView = () => (
  <div>
    <form id="signUp" name="signUp" method="post" action="/signUp">
        <label for="email">Email Address: </label>
        <input class="text" name="email" type="email" />{' '}
        <label for="firstname">Firstname: </label>
        <input name="firstname" type="text" />{' '}
        <label for="lastname">Lastname: </label>
        <input name="lastname" type="text" />{' '}
        <label for="password">Password: </label>
        <input name="password" type="password" />{' '}
        <input class="btn" type="submit" value="Sign Up" />
    </form>
  </div>
);

export default SignUpView;