import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import renderWithRouter from './utils/renderWithRouter';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const LOGIN_BTN_ID = 'login-submit-btn';
const EMAIL = 'grupo25@trybe.com';
const PROFILE_ICON_ID = 'profile-top-btn';
const SEARCH_ICON_ID = 'search-top-btn';

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
  });

  describe('Header component coverage', () => {
    it('redirects to Profile from Meals Page after clicking on Profile Icon, Search icon/bar behavior', async () => {
      const { history } = renderWithRouter(<Header />, '/meals');

      const headerTitle = screen.getByTestId('page-title');
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle).toHaveTextContent(/Meals/i);

      const profileBtn = screen.queryByTestId(PROFILE_ICON_ID);
      expect(profileBtn).toBeInTheDocument();
      const searchBtn = screen.queryByTestId(SEARCH_ICON_ID);
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);
      const searchBar = screen.getByTestId('search-input');
      expect(searchBar).toBeInTheDocument();

      userEvent.click(profileBtn);
      expect(history.location.pathname).toBe('/profile');
      expect(searchBtn).not.toBeInTheDocument();
    });

    it('Header behavior on Drinks page', () => {
      renderWithRouter('/drinks');

      const headerTitle = screen.getByTestId('page-title');
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle).toHaveTextContent(/Drinks/i);

      const profileBtn = screen.queryByTestId(PROFILE_ICON_ID);
      expect(profileBtn).toBeInTheDocument();
      const searchBtn = screen.queryByTestId(SEARCH_ICON_ID);
      expect(searchBtn).toBeInTheDocument();
    });

    it('Header behavior on Done Recipes page', () => {
      renderWithRouter('/done-recipes');

      const headerTitle = screen.getByText(/Done Recipes/i);
      expect(headerTitle).toBeInTheDocument();

      const profileBtn = screen.queryByTestId(PROFILE_ICON_ID);
      expect(profileBtn).toBeInTheDocument();
      const searchBtn = screen.queryByTestId(SEARCH_ICON_ID);
      expect(searchBtn).not.toBeInTheDocument();
    });

    it('Header behavior on Favorite Recipes page', () => {
      renderWithRouter('/favorite-recipes');

      const headerTitle = screen.getByText(/Favorite Recipes/i);
      expect(headerTitle).toBeInTheDocument();

      const profileBtn = screen.queryByTestId(PROFILE_ICON_ID);
      expect(profileBtn).toBeInTheDocument();
      const searchBtn = screen.queryByTestId(SEARCH_ICON_ID);
      expect(searchBtn).not.toBeInTheDocument();
    });
  });
});
