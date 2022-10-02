import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import fetchDrinks from '../API/DrinksAPI';
import MealRecommendation from '../components/MealRecommendation';
import '../styles/recipesImages.css';
import '../styles/footer.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import { favoriteRecipes } from '../helpers/localStorage';

const copy = require('clipboard-copy');

function DrinkRecipe() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [drink, setDrink] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { favorites, setFavorites } = useContext(RecipeAppContext);

  const drinkRecipeDetail = async () => {
    setDrink(await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  useEffect(() => {
    drinkRecipeDetail();
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
  }, []);

  const handleShareClick = () => {
    copy(`http://localhost:3000${location.pathname}`);
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
    setFavorites([...favorites, addFavorite]);
  };

  useEffect(() => {
    favoriteRecipes(favorites);
  }, [favorites]);

  const drinkObject = Object.values(drink);
  const drinkObjectEntries = drinkObject.length > 0 && Object.entries(drinkObject[0]);
  const ingredients = [];
  const measures = [];

  if (drinkObject.length > 0) {
    drinkObjectEntries.forEach((chave) => {
      if (chave[0].includes('Ingredient') && chave[1] !== null) {
        ingredients.push(chave[1]);
      }
    });
    drinkObjectEntries.forEach((chave) => {
      if (chave[0].includes('Measure') && chave[1] !== null) {
        measures.push(chave[1]);
      }
    });
  }

  const ingredientsWithMeasure = ingredients.map((e, i) => `${e}: ${measures[i]}`);

  return (
    <div>
      {drink.map((drinkRecipe, i) => {
        const { strDrink, strAlcoholic, strDrinkThumb } = drinkRecipe;
        return (
          <div key={ i }>
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
      {ingredientsWithMeasure.map((ingredient, i) => (
        <p
          data-testid={ `${i}-ingredient-name-and-measure` }
          key={ i }
        >
          {ingredient}
        </p>))}
      { drink.map((drinkRecipe, i) => {
        const { strInstructions } = drinkRecipe;
        return (
          <div key={ i }>
            <h4>Instructions</h4>
            <p data-testid="instructions">{ strInstructions}</p>
          </div>
        );
      })}
      <div>
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
          src={ whiteHeartIcon }
          alt="share"
          onClick={ handleFavoriteClick }
        />
        {isCopied && <p>Link copied!</p>}
      </div>
      <MealRecommendation />
      { isHidden && (
        <button
          style={ { position: 'fixed', bottom: '0' } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => { history.push(`/drinks/${id}/in-progress`); } }
        >
          {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default DrinkRecipe;
