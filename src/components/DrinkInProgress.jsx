import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import fetchDrinks from '../API/DrinksAPI';
import RecipeAppContext from '../context/RecipeAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipes, getStorageFavoriteList } from '../helpers/localStorage';

const copy = require('clipboard-copy');

export default function DrinkRecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [drink, setDrink] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [heartColor, setHeartColor] = useState(true);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const { favorites, setFavorites } = useContext(RecipeAppContext);

  const drinkRecipeDetail = async () => {
    setDrink(await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  const setLocalStorage = () => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (!inProgressList.drinks) {
      const firstEntry = {
        drinks: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(firstEntry));
    }
  };

  useEffect(() => {
    drinkRecipeDetail();
    setLocalStorage();
    if (localStorage.getItem('favoriteRecipes') !== null
    && getStorageFavoriteList(id) === true) {
      setHeartColor(false);
    } else {
      setHeartColor(true);
    }
  }, []);

  const drinkObject = Object.values(drink);
  const drinkObjectEntries = drinkObject.length > 0 && Object.entries(drinkObject[0]);
  const ingredients = [];
  const measures = [];

  if (drinkObject.length > 0) {
    drinkObjectEntries.forEach((chave) => {
      if (chave[0].includes('Ingredient') && chave[1] !== '' && chave[1] !== null) {
        ingredients.push(chave[1]);
      }
    });
    drinkObjectEntries.forEach((chave) => {
      if (chave[0].includes('Measure') && chave[1] !== '' && chave[1] !== null) {
        measures.push(chave[1]);
      }
    });
  }

  const ingredientsWithMeasure = ingredients.map((ingredient, i) => {
    const a = {
      name: ingredient,
      measure: measures[i],
    };
    return a;
  });

  const handleShareClick = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setIsCopied((prevState) => !prevState);
  };

  const handleFavoriteClick = () => {
    const drinkRecipe = drink.find((recipe) => recipe);
    const { idDrink, strDrink, strCategory, strAlcoholic, strDrinkThumb } = drinkRecipe;
    const addFavorite = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (getStorageFavoriteList(idDrink) === false) {
      const addRecipe = [...favorites, addFavorite];
      setFavorites(addRecipe);
      setHeartColor(false);
      favoriteRecipes(addRecipe);
    } else {
      const filter = favorites.filter((recipe) => recipe.id !== idDrink);
      setFavorites(filter);
      setHeartColor((prevState) => !prevState);
      favoriteRecipes(filter);
    }
  };

  const handleIngredientCheck = (ingr) => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const checkedIngredients = inProgressList.drinks[id];
    const drinksToSave = {
      drinks: {
        [id]: [...checkedIngredients, ingr.name],
      },
    };
    const isAlreadyChecked = checkedIngredients
      .some((ingredient) => ingredient === ingr.name);
    if (isAlreadyChecked === false) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinksToSave));
    } else {
      const afterRemoveIngredient = checkedIngredients
        .filter((ingredient) => ingredient !== ingr.name);
      const newdrinksToSave = {
        drinks: {
          [id]: afterRemoveIngredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newdrinksToSave));
    }
    setUsedIngredients(inProgressList.drinks[id]);
  };

  useEffect(() => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const checkedIngredients = inProgressList.drinks[id] || [];
    const allIngredientsChecked = checkedIngredients.length > 1
    && checkedIngredients.length >= ingredientsWithMeasure.length;
    if (allIngredientsChecked) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [usedIngredients]);

  const handleFinishRcpBtn = () => {
    history.push('/done-recipes');
  };

  const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

  return (
    <div>
      {drink.map((drinkRecipe) => {
        const { strDrink, strAlcoholic, strDrinkThumb } = drinkRecipe;
        return (
          <div key={ strDrink }>
            <img
              className="recipes-main"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h1 data-testid="recipe-title">{ strDrink }</h1>
            <h2 data-testid="recipe-category">{ strAlcoholic }</h2>
          </div>
        );
      })}

      <h4>Ingredients</h4>
      {ingredientsWithMeasure.map((ingredient, index) => (
        <label
          htmlFor="ingredients"
          data-testid={ `${index}-ingredient-step` }
          key={ ingredient }
        >
          <input
            type="checkbox"
            onChange={ () => handleIngredientCheck(ingredient) }
            checked={ inProgressList.drinks[id].some((ingr) => ingredient.name === ingr) }
          />
          { `${ingredient.name}: ${ingredient.measure}` }
        </label>
      ))}
      { drink.map((drinkRecipe, i) => {
        const { strInstructions } = drinkRecipe;
        return (
          <div key={ i }>
            <h4>Instructions</h4>
            <p data-testid="instructions">{ strInstructions}</p>
          </div>
        );
      })}
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        alt="share"
        onClick={ handleShareClick }
      />
      {isCopied && <p>Link copied!</p>}
      <input
        type="image"
        data-testid="favorite-btn"
        src={ heartColor ? whiteHeartIcon : blackHeartIcon }
        alt="favorite"
        onClick={ handleFavoriteClick }
      />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRcpBtn }
        disabled={ isBtnDisabled }
      >
        FINISH RECIPE
      </button>
    </div>
  );
}
