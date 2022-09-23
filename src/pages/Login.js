import React from 'react';

function Login() {
  return (
    <form>
      <input
        type="email"
        placeholder="Seu e-mail"
        name="email"
        // value={ email }
        data-testid="email-input"
        // onChange={}
      />
      <input
        type="password"
        placeholder="senha"
        name="password"
        // value={ password }
        data-testid="password-input"
        // onChange={}
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        // disabled={}
        // onClick={}
      >
        Login
      </button>
    </form>
  );
}

export default Login;
