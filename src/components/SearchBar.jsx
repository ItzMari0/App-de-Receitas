import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fetchMeals from '../API/MealsAPI';
import fetchDrinks from '../API/DrinksAPI';

function SearchBar() {
//  const history = useHistory();
  const location = useLocation();
  const [recipeSearch, setRecipeSearch] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);

  useEffect(() => {
    if (recipeSearch === '') {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [recipeSearch]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setRecipeSearch(value);
  };

  const handleRadioSelect = ({ target }) => {
    const { value } = target;
    setSearchRadio(value);
  };

  const handleMealSearch = async () => {
    if (searchRadio === 'ingredient') {
      const recipesData = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearch}`);
      setRecipes(recipesData.filter((list) => list));
      //  if (recipesData.length === 1) {
      //    const { idMeal } = recipesData;
      //    history.push('/meals', { idMeal });
      //  }
    }
    if (searchRadio === 'name') {
      const recipesData = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearch}`);
      setRecipes(recipesData.filter((list) => list));
    //  if (setRecipes.length === 1) {
    //    history.push(`/meals/${recipes.idMeal}`);
    //  }
    }
    if (searchRadio === 'first-letter') {
      if (recipeSearch.length === 1) {
        const recipesData = await fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipeSearch}`);
        setRecipes(recipesData.filter((list) => list));
        //  if (recipesData.length === 1) {
        //    history.push(`/meals/${recipesData.idMeal}`);
        //  }
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleDrinkSearch = async () => {
    if (searchRadio === 'ingredient') {
      const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipeSearch}`);
      setRecipes(recipesData.filter((list) => list));
      //  if (recipesData.length === 1) {
      //    history.push(`/drinks/${recipesData.idDrink}`);
      //  }
    }
    if (searchRadio === 'name') {
      const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipeSearch}`);
      setRecipes(recipesData.filter((list) => list));
      //  if (recipesData.length === 1) {
      //    history.push(`/drinks/${recipesData.idDrink}`);
      //  }
    }
    if (searchRadio === 'first-letter') {
      if (recipeSearch.length === 1) {
        const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${recipeSearch}`);
        setRecipes(recipesData.filter((list) => list));
        //    if (recipesData.length === 1) {
        //    history.push(`/drinks/${recipesData.idDrink}`);
        //  }
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  console.log(recipes);

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

export default SearchBar;
