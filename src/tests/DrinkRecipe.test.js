import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doneRecipeToken, favoriteRecipes, inProgressRecipes } from '../helpers/localStorage';
import renderWithRouter from './utils/renderWithRouter';

describe('Drink Recipes component behavior', () => {
  beforeEach(() => cleanup());
  it('shows start recipe button if recipe is not in done recipes localStorage', async () => {
    const { history } = renderWithRouter('/drinks/15997');
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    doneRecipeToken({
      id: '15977',
      type: 'drink',
      nationality: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      doneDate: '05/10/2022',
      tags: [],
    });
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  it('shows continue recipe button if recipe is in progress', () => {
    renderWithRouter('/drinks/17222');
    inProgressRecipes({
      drinks: {
        17222: ['Gin'],
      },
      meals: {},
    });
    renderWithRouter('/drinks/17222');
  });
});

describe('favorite function', () => {
  beforeEach(() => cleanup());
  it('favorites the recipe', async () => {
    const { history } = renderWithRouter('/drinks');
    favoriteRecipes(([{
      id: '13501',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'ABC',
      image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    }]));
    await waitFor(() => expect(screen.getByTestId('2-card-name')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('2-card-name'));
    expect(history.location.pathname).toBe('/drinks/13501');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveProperty('src', 'http://localhost/drinks/blackHeartIcon.svg');
    userEvent.click(favoriteBtn);
  });
});
