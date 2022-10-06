import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

const SEARCH_ICON_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const BTN_SEARCH_ID = 'exec-search-btn';
const NAME_RADIO_ID = 'name-search-radio';
const INGREDIENT_RADIO_ID = 'ingredient-search-radio';
const FIRST_LETTER_RADIO_ID = 'first-letter-search-radio';
const LAST_RECIPE = '11-card-name';

describe('SearchBar component behavior', () => {
  beforeEach(() => cleanup());
  it('Search button enables after typing', () => {
    renderWithRouter('/meals');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    expect(searchBtn).toBeDisabled();
    userEvent.type(searchInput, 'apple');
    expect(searchBtn).toBeEnabled();
    const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    userEvent.click(nameInputRadio);
    expect(nameInputRadio).toHaveAttribute('value', 'name');
  });
});

describe('Meals & Drinks API and redirection', () => {
  beforeEach(() => cleanup());
  it('Redirects to its meal page when search result is only one recipe', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));
    const { history } = renderWithRouter('/meals');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'arrabiata');
    const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    userEvent.click(nameInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(5));
    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('Redirects to its drink page when search result is only one recipe', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneDrink),
      }));
    const { history } = renderWithRouter('/drinks');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'aquamarine');
    const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    userEvent.click(nameInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(5));
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

describe('Search by ingredient', () => {
  beforeEach(() => cleanup());
  it('Show meals search results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mealsByIngredient),
      }));
    renderWithRouter('/meals');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'chicken');
    const ingredientInputRadio = screen.getByTestId(INGREDIENT_RADIO_ID);
    userEvent.click(ingredientInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId('9-card-name')).toBeInTheDocument());
  });
  it('Show drinks search results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(ginDrinks),
      }));
    renderWithRouter('/drinks');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'gin');
    const ingredientInputRadio = screen.getByTestId(INGREDIENT_RADIO_ID);
    userEvent.click(ingredientInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId(LAST_RECIPE)).toBeInTheDocument());
  });
});

describe('Search by first letter', () => {
  beforeEach(() => cleanup());
  it('Show drinks search results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(drinks),
      }));
    renderWithRouter('/drinks');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'a');
    const firstLetterInputRadio = screen.getByTestId(FIRST_LETTER_RADIO_ID);
    userEvent.click(firstLetterInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId(LAST_RECIPE)).toBeInTheDocument());
  });
  it('Show meals search results', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(meals),
      }));
    renderWithRouter('/meals');
    const searchBarIcon = screen.queryByTestId(SEARCH_ICON_ID);
    expect(searchBarIcon).toBeInTheDocument();
    userEvent.click(searchBarIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchInput).toBeInTheDocument();
    const searchBtn = screen.getByTestId(BTN_SEARCH_ID);
    userEvent.type(searchInput, 'b');
    const firstLetterInputRadio = screen.getByTestId(FIRST_LETTER_RADIO_ID);
    userEvent.click(firstLetterInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId(LAST_RECIPE)).toBeInTheDocument());
  });
});

describe('shows alert on Meals Page when no recipe is found by ingredientfirst letter', () => {
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
    const firstLetterInputRadio = screen.getByTestId(FIRST_LETTER_RADIO_ID);
    userEvent.click(firstLetterInputRadio);
    userEvent.click(searchBtn);
    expect(window.global.alert).toHaveBeenCalled();
    const ingredientInputRadio = screen.getByTestId(INGREDIENT_RADIO_ID);
    userEvent.click(ingredientInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
    // const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    // userEvent.click(nameInputRadio);
    // userEvent.click(searchBtn);
    // await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
  });
});

describe('shows alert on Drinks Page when no recipe is found by ingredient/name/first letter', () => {
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
    const firstLetterInputRadio = screen.getByTestId(FIRST_LETTER_RADIO_ID);
    userEvent.click(firstLetterInputRadio);
    userEvent.click(searchBtn);
    expect(window.global.alert).toHaveBeenCalled();
    const ingredientInputRadio = screen.getByTestId(INGREDIENT_RADIO_ID);
    userEvent.click(ingredientInputRadio);
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));
    await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
    // const nameInputRadio = screen.getByTestId(NAME_RADIO_ID);
    // userEvent.click(nameInputRadio);
    // userEvent.click(searchBtn);
    // await waitFor(() => expect(window.global.alert).toHaveBeenCalled());
  });
});
