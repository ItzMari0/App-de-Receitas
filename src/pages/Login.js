import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '../context/RecipeAppContext';
import { userEmail, userMealsToken, userDrinksToken } from '../helpers/localStorage';

function Login({ history }) {
  const { login, setLogin, disabled, setDisabled } = useContext(RecipeAppContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = () => {
    userEmail({ email: login.email });
    userMealsToken('1');
    userDrinksToken('1');

    history.push('/meals');
  };

  useEffect(() => {
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MAGIC_NUMBER = 6;
    if (login.password.length > MAGIC_NUMBER && EMAIL.test(login.email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login.email, login.password, disabled, setDisabled]);

  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          placeholder=" e-mail"
          name="email"
          value={ login.email }
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          placeholder="password"
          name="password"
          value={ login.password }
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleLoginSubmit }
      >
        Login
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
