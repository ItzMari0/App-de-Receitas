import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import fetchMeals from '../API/MealsAPI';
import RecipeAppContext from '../context/RecipeAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipes, getStorageFavoriteList } from '../helpers/localStorage';

const copy = require('clipboard-copy');

export default function MealRecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [meal, setMeal] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [heartColor, setHeartColor] = useState(true);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const { favorites, setFavorites } = useContext(RecipeAppContext);

  const mealRecipeDetail = async () => {
    setMeal(await fetchMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  useEffect(() => {
    mealRecipeDetail();
    if (localStorage.getItem('favoriteRecipes') !== null
    && getStorageFavoriteList(id) === true) {
      setHeartColor(false);
    } else {
      setHeartColor(true);
    }
  }, []);

  const mealObject = Object.values(meal);
  const mealObjectEntries = mealObject.length > 0 && Object.entries(mealObject[0]);
  const ingredients = [];
  const measures = [];

  if (mealObject.length > 0) {
    mealObjectEntries.forEach((chave) => {
      if (chave[0].includes('Ingredient') && chave[1] !== '' && chave[1] !== null) {
        ingredients.push(chave[1]);
      }
    });
    mealObjectEntries.forEach((chave) => {
      if (chave[0].includes('Measure') && chave[1] !== ' ') {
        measures.push(chave[1]);
      }
    });
  }

  const ingredientsWithMeasure = ingredients.map((ingredient, i) => {
    const ingredientObject = {
      name: ingredient,
      measure: measures[i],
      // isChecked: false,
    };
    return ingredientObject;
  });

  const handleShareClick = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setIsCopied((prevState) => !prevState);
  };

  const handleFavoriteClick = () => {
    const mealRecipe = meal.find((recipe) => recipe);
    const { idMeal, strMeal, strCategory, strArea, strMealThumb } = mealRecipe;
    const addFavorite = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (getStorageFavoriteList(idMeal) === false) {
      const addRecipe = [...favorites, addFavorite];
      setFavorites(addRecipe);
      setHeartColor(false);
      favoriteRecipes(addRecipe);
    } else {
      const filter = favorites.filter((recipe) => recipe.id !== idMeal);
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
      {meal.map((mealRecipe, index) => {
        const { strMeal, strCategory, strMealThumb } = mealRecipe;
        return (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h2 data-testid="recipe-title">{ strMeal }</h2>
            <h3 data-testid="recipe-category">{ strCategory }</h3>
          </div>
        );
      })}

      <h4>Ingredients</h4>
      { ingredientsWithMeasure.map((ingredient, index) => (
        <label
          htmlFor="ingredients"
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            onChange={ () => handleIngredientCheck(ingredient) }
          />
          { `${ingredient.name}: ${ingredient.measure}` }
        </label>
      ))}

      { meal.map((mealRecipe) => {
        const { strYoutube, strInstructions } = mealRecipe;
        return (
          <div key={ mealRecipe }>
            <h4>Instructions</h4>
            <p data-testid="instructions">{ strInstructions}</p>
            <iframe
              data-testid="video"
              width="300"
              height="200"
              src={ strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
