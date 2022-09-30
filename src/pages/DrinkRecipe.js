import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchDrinks from '../API/MealsAPI';

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState([]);

  const drinkRecipeDetail = async () => {
    setDrink(await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  useEffect(() => {
    drinkRecipeDetail();
  }, []);

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
        measures.push(key[1]);
      }
    });
  }

  const iandm = ingredients.map((e, i) => `${e}: ${measures[i]}`);

  return (
    <div>
      {drink.map((drinkRecipe, index) => {
        const { strDrink, strCategory, strDrinkThumb } = drinkRecipe;
        return (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h1 data-testid="recipe-title">{ strDrink }</h1>
            <h2 data-testid="recipe-category">{ strCategory }</h2>
          </div>
        );
      })}
      <h4>Ingredients</h4>
      {iandm.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {ingredient}
        </p>))}
      { drink.map((drinkRecipe, index) => {
        const { strYoutube, strInstructions } = drinkRecipe;
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

    </div>
  );
}

export default DrinkRecipe;
