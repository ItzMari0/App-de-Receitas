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
  console.log(Object.keys(meal).filter((m) => m.includes('strIngredient')));

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

      { meal.map((mealRecipe, index) => {
        const { strYoutube, strInstructions } = mealRecipe;
        return (
          <div key={ index }>
            <p />
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
