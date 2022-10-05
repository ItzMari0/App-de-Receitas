import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';

describe('Footer component coverage', () => {
  it('redirects to Drinks page after clicking on Drinks Footer Icon', async () => {
    const { history } = renderWithRouter('/meals');
    const drinksFooterBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksFooterBtn).toBeInTheDocument();
    userEvent.click(drinksFooterBtn);
    expect(history.location.pathname).toBe('/drinks');
  });

  it('redirects to Meals page after clicking on Meals Footer Icon', async () => {
    const { history } = renderWithRouter('/drinks');
    const mealsFooterBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsFooterBtn).toBeInTheDocument();
    userEvent.click(mealsFooterBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
