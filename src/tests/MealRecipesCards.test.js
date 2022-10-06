import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const SEARCH_ICON_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const BTN_SEARCH_ID = 'exec-search-btn';
const NAME_RADIO_ID = 'name-search-radio';

describe('Meal Recipes Card behavior', () => {
  beforeEach(() => cleanup());
  it('shows filter buttons and 12 recipe list', async () => {
    renderWithRouter('/meals');
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mealCategories),
      }));
    await waitFor(() => expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('Beef-category-filter'));
  });
});

describe('shows alert on Meals Page when no recipe is found by name', () => {
  beforeEach(() => cleanup());
  it('shows alert on Meals page', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(emptyMeals),
      }));
    global.alert = jest.fn();
    renderWithRouter('/meals');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'xablau');
    const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    userEvent.click(nameInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
  });
});

describe('shows alert on Drinks Page when no recipe is found by name', () => {
  beforeEach(() => cleanup());
  it('shows alert on Drinks page', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(emptyDrinks),
      }));
    global.alert = jest.fn();
    renderWithRouter('/drinks');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'xablau');
    const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    userEvent.click(nameInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
  });
});
