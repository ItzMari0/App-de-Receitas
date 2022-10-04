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

  useEffect(() => {
    drinkRecipeDetail();
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
      // isChecked: false,
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
    console.log(ingredientsWithMeasure.length);
    const alreadyUsing = usedIngredients
      .some((ingredient) => ingr.name === ingredient.name);
    const removeIngredient = usedIngredients
      .filter((ingredient) => ingr.name !== ingredient.name);
    if (alreadyUsing === false) {
      setUsedIngredients([...usedIngredients, ingr]);
    } else {
      setUsedIngredients(removeIngredient);
    }
  };

  useEffect(() => {
    console.log(usedIngredients, 'ingredientes usados');
    console.log(usedIngredients.length, 'tamanho');
    const allIngredientsChecked = usedIngredients.length > 1
    && usedIngredients.length >= ingredientsWithMeasure.length;
    if (allIngredientsChecked) {
      setIsBtnDisabled(false);
      console.log('oi');
    } else {
      setIsBtnDisabled(true);
    }
  }, [usedIngredients]);

  const handleFinishRcpBtn = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      {drink.map((drinkRecipe, index) => {
        const { strDrink, strAlcoholic, strDrinkThumb } = drinkRecipe;
        return (
          <div key={ index }>
            <img
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
