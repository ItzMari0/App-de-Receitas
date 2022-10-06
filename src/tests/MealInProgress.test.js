import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';

describe('Recipe in Progress component behavior', () => {
  beforeEach(() => cleanup());
  it('redirects to Meal in Progress page', async () => {
    const { history } = renderWithRouter('/meals');
    await waitFor(() => expect(screen.getByTestId('0-card-name')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('0-card-name'));
    expect(history.location.pathname).toBe('/meals/52977');
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  it('checks Meals ingredients and measures', async () => {
    renderWithRouter('/meals/52977');
    await waitFor(() => expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent(/Lentils: 1 cup/i));
  });
});
