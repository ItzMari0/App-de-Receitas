import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doneRecipeToken, favoriteRecipes, inProgressRecipes } from '../helpers/localStorage';
import renderWithRouter from './utils/renderWithRouter';

describe('Meal Recipes component behavior', () => {
  beforeEach(() => cleanup());
  it('shows start recipe button if recipe is not in done recipes localStorage', async () => {
    const { history } = renderWithRouter('/meals/52977');
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    doneRecipeToken({
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      doneDate: '05/10/2022',
      tags: ['Soup'],
    });
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  it('shows continue recipe button if recipe is in progress', async () => {
    renderWithRouter('/meals/53060');
    inProgressRecipes({
      drinks: {},
      meals: {
        53060: ['Filo Pastry'],
      },
    });
    renderWithRouter('/meals/53060');
  });
});

describe('favorite function', () => {
  beforeEach(() => cleanup());
  it('favorites the recipe', async () => {
    const { history } = renderWithRouter('/meals');
    favoriteRecipes(([{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      alcoholicOrNot: '',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    }]));
    await waitFor(() => expect(screen.getByTestId('2-card-name')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('2-card-name'));
    expect(history.location.pathname).toBe('/meals/53065');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveProperty('src', 'http://localhost/meals/blackHeartIcon.svg');
    userEvent.click(favoriteBtn);
  });
});
