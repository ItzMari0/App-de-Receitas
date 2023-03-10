import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';

const PROFILE_ICON_ID = 'profile-top-btn';
const SEARCH_ICON_ID = 'search-top-btn';

describe('Header component coverage', () => {
  it('redirects to Profile from Meals Page after clicking on Profile Icon, Search icon/bar behavior', async () => {
    const { history } = renderWithRouter('/meals');
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
