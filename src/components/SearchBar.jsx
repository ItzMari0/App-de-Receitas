import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchMeals from '../API/MealsAPI';
import fetchDrinks from '../API/DrinksAPI';
import RecipeAppContext from '../context/RecipeAppContext';

const NORECIPEFOUND = 'Sorry, we haven\'t found any recipes for these filters.';

function SearchBar({ history }) {
  const location = useLocation();
  const [recipeSearch, setRecipeSearch] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  // const [recipes, setRecipes] = useState([]);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const { recipes, setRecipes } = useContext(RecipeAppContext);

  useEffect(() => {
    if (recipeSearch === '') {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [recipeSearch]);

  useEffect(() => {
    if (location.pathname === '/meals' && recipes.length === 1) {
      const id = recipes.map(({ idMeal }) => idMeal);
      history.push(`/meals/${id}`);
    }
    if (location.pathname === '/drinks' && recipes.length === 1) {
      const id = recipes.map(({ idDrink }) => idDrink);
      history.push(`/drinks/${id}`);
    }
  }, [recipes, history, location]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setRecipeSearch(value);
  };

  const handleRadioSelect = ({ target }) => {
    const { value } = target;
    setSearchRadio(value);
  };

  const handleMealSearch = async () => {
    if (location.pathname === '/meals' && searchRadio === 'ingredient') {
      const recipesData = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearch}`);
      if (recipesData === null) {
        global.alert(NORECIPEFOUND);
      } else {
        setRecipes(recipesData);
      }
    }
    if (location.pathname === '/meals' && searchRadio === 'name') {
      const recipesData = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearch}`);
      if (recipesData === null) {
        global.alert(NORECIPEFOUND);
      } else {
        setRecipes(recipesData);
      }
    }
    if (location.pathname === '/meals' && searchRadio === 'first-letter') {
      if (recipeSearch.length === 1) {
        setRecipes(await fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipeSearch}`));
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleDrinkSearch = async () => {
    if (location.pathname === '/drinks' && searchRadio === 'ingredient') {
      const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipeSearch}`);
      if (recipesData === null) {
        global.alert(NORECIPEFOUND);
      } else {
        setRecipes(recipesData);
      }
    }
    if (location.pathname === '/drinks' && searchRadio === 'name') {
      const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipeSearch}`);
      if (recipesData === null) {
        global.alert(NORECIPEFOUND);
      } else {
        setRecipes(recipesData);
      }
    }
    if (location.pathname === '/drinks' && searchRadio === 'first-letter') {
      if (recipeSearch.length === 1) {
        setRecipes(await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${recipeSearch}`));
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ recipeSearch }
        onChange={ handleChange }
      />
      <input
        type="radio"
        name="search-radio"
        value="ingredient"
        data-testid="ingredient-search-radio"
        onClick={ handleRadioSelect }
        required
      />
      Ingredient
      <input
        type="radio"
        name="search-radio"
        value="name"
        data-testid="name-search-radio"
        onClick={ handleRadioSelect }
        required
      />
      Name
      <input
        type="radio"
        name="search-radio"
        value="first-letter"
        data-testid="first-letter-search-radio"
        onClick={ handleRadioSelect }
        required
      />
      First letter
      <button
        type="reset"
        data-testid="exec-search-btn"
        disabled={ searchBtnDisabled }
        onClick={ location.pathname === '/meals' ? handleMealSearch : handleDrinkSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SearchBar;
