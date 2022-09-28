import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Profile page coverage', () => {
  it('shows "No Profile Found!" message in case profile is not found', () => {
    renderWithRouter('/profile');
    window.localStorage.getItem('user', JSON.stringify());
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toHaveTextContent('No Profile Found!');
  });
  
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