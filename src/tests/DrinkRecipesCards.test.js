import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Drink Recipes Card behavior', () => {
  beforeEach(() => cleanup());
  it('shows filter buttons and 12 recipe list', async () => {
    renderWithRouter('/drinks');
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(drinkCategories),
      }));
    await waitFor(() => expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('Cocktail-category-filter'));
  });
});
