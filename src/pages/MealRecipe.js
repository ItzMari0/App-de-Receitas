import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import fetchMeals from '../API/MealsAPI';
import DrinkRecommendation from '../components/DrinkRecommendation';
import '../styles/recipesImages.css';
import '../styles/footer.css';
import '../styles/Icons.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import { favoriteRecipes, getStorageFavoriteList } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function MealRecipe() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [meal, setMeal] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [heartColor, setHeartColor] = useState(true);
  const { favorites, setFavorites } = useContext(RecipeAppContext);

  const mealRecipeDetail = async () => {
    setMeal(await fetchMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  useEffect(() => {
    mealRecipeDetail();
    if (localStorage.getItem('doneRecipes') !== null) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setContinueRecipe(true);
    } else {
      setContinueRecipe(false);
    }
    if (localStorage.getItem('favoriteRecipes') !== null
      && getStorageFavoriteList(id) === true) {
      setHeartColor(false);
    } else {
      setHeartColor(true);
    }
  }, []);

  const handleShareClick = () => {
    copy(`http://localhost:3000${location.pathname}`);
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
      if (chave[0].includes('Measure') && chave[1] !== ' ' && chave[1] !== null) {
        measures.push(chave[1]);
      }
    });
  }

  const ingredientsWithMeasure = ingredients.map((e, i) => `${e}: ${measures[i]}`);

  return (
    <div>
      {meal.map((mealRecipe, index) => {
        const { strMeal, strCategory, strMealThumb } = mealRecipe;
        return (
          <div key={ index }>
            <img
              className="recipes-main"
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
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { ingredient }
        </p>
      ))}
      { meal.map((mealRecipe, index) => {
        const { strYoutube, strInstructions } = mealRecipe;
        return (
          <div key={ index }>
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
        className="share"
        src={ shareIcon }
        alt="share"
        onClick={ handleShareClick }
      />
      <input
        type="image"
        data-testid="favorite-btn"
        className="favorite"
        src={ heartColor ? whiteHeartIcon : blackHeartIcon }
        alt="favorite"
        onClick={ handleFavoriteClick }
      />
      {isCopied && <p>Link copied!</p>}
      <DrinkRecommendation />
      { isHidden && (
        <button
          style={ { position: 'fixed', bottom: '0' } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => { history.push(`/meals/${id}/in-progress`); } }
        >
          {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default MealRecipe;
