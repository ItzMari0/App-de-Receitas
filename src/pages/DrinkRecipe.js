import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchDrinks from '../API/DrinksAPI';

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState([]);

  const drinkRecipeDetail = async () => {
    setDrink(await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
  };
  console.log(drink);

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

    </div>
  );
}

export default DrinkRecipe;
