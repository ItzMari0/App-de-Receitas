import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const LOGIN_BTN_ID = 'login-submit-btn';
const EMAIL = 'grupo25@trybe.com';

describe('App test coverage', () => {
  describe('Login page coverage', () => {
    it('Login page renders properly', () => {
      renderWithRouter(<App />);

      const emailInput = screen.getByTestId(EMAIL_ID);
      expect(emailInput).toBeInTheDocument();

      const passwordInput = screen.getByTestId(PASSWORD_ID);
      expect(passwordInput).toBeInTheDocument();

      const loginBtn = screen.getByTestId(LOGIN_BTN_ID);
      expect(loginBtn).toBeInTheDocument();
      expect(loginBtn).toBeDisabled();
    });

    it('Email, Password Inputs & Login Button are working properly', () => {
      renderWithRouter(<App />);

      const emailInput = screen.getByTestId(EMAIL_ID);
      userEvent.type(emailInput, EMAIL);
      expect(emailInput).toHaveProperty('value', EMAIL);

      const passwordInput = screen.getByTestId(PASSWORD_ID);
      userEvent.type(passwordInput, '1234567');
      expect(passwordInput).toHaveProperty('value', '1234567');

      const loginBtn = screen.getByTestId(LOGIN_BTN_ID);
      expect(loginBtn).toBeEnabled();
    });

    it('redirects to Meals Page screen after Logging in', () => {
      const { history } = renderWithRouter(<App />);

      expect(history.location.pathname).toBe('/');

      const emailInput = screen.getByTestId(EMAIL_ID);
      userEvent.type(emailInput, EMAIL);
      const passwordInput = screen.getByTestId(PASSWORD_ID);
      userEvent.type(passwordInput, '1234567');
      const loginBtn = screen.getByTestId(LOGIN_BTN_ID);
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/meals');
    });

    describe('Profile page coverage', () => {
      it('Redirects to Done Recipes page ', () => {
        const { history } = renderWithRouter('/profile');
        const doneRecipesBtn = screen.getByTestId('profile-done-btn');
        expect(doneRecipesBtn).toBeInTheDocument();
        userEvent.click(doneRecipesBtn);
        expect(history.location.pathname).toBe('/done-recipes');
      });

      it('Redirects to Favorite Recipes page ', () => {
        const { history } = renderWithRouter('/profile');
        const favRecipesBtn = screen.getByTestId('profile-favorite-btn');
        expect(favRecipesBtn).toBeInTheDocument();
        userEvent.click(favRecipesBtn);
        expect(history.location.pathname).toBe('/favorite-recipes');
      });

      it('Logs out from Profile Page', () => {
        const { history } = renderWithRouter('/profile');
        const logoutBtn = screen.getByTestId('profile-logout-btn');
        expect(logoutBtn).toBeInTheDocument();
        userEvent.click(logoutBtn);
        expect(history.location.pathname).toBe('/');
      });
    });
  });
});
