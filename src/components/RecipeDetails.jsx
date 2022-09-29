import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkRecipe from '../pages/DrinkRecipe';
import MealRecipe from '../pages/MealRecipe';

function RecipeDetails() {
  const location = useLocation();

  return (
    <div>
      {location.pathname.includes('/meals')
        ? <MealRecipe /> : <DrinkRecipe />}
    </div>
  );
}

export default RecipeDetails;
