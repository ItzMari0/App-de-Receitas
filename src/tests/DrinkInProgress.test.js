import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';

describe('Recipe in Progress component behavior', () => {
  beforeEach(() => cleanup());
  it('redirects to Drink in Progress page', async () => {
    const { history } = renderWithRouter('/drinks');
    await waitFor(() => expect(screen.getByTestId('0-card-name')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('0-card-name'));
    expect(history.location.pathname).toBe('/drinks/15997');
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
