import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchMeals from '../API/MealsAPI';

function MealRecipe() {
  const { id } = useParams();
  const [meal, setMeal] = useState([]);

  const mealRecipeDetail = async () => {
    setMeal(await fetchMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
  };

  useEffect(() => {
    mealRecipeDetail();
  }, []);

  const mealObject = Object.values(meal);
  const mealObjectEntries = mealObject.length > 0 && Object.entries(mealObject[0]);
  const ingredients = [];
  const measures = [];

  if (mealObject.length > 0) {
    mealObjectEntries.forEach((chave) => {
      if (chave[0].includes('Ingredient') && chave[1] !== '') {
        ingredients.push(chave[1]);
      }
    });
    mealObjectEntries.forEach((chave) => {
      if (chave[0].includes('Measure') && chave[1] !== ' ') {
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
    </div>
  );
}
export default MealRecipe;
