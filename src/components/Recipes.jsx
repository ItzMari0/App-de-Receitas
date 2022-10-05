import React from 'react';
import { useLocation } from 'react-router-dom';
import MealRecipesCard from './MealRecipesCards';
import DrinkRecipesCard from './DrinkRecipesCards';

function Recipes() {
  const location = useLocation();

  if (location.pathname === '/meals') {
    return (
      <div>
        <MealRecipesCard />
      </div>
    );
  }

  return (
    <div>
      <DrinkRecipesCard />
    </div>
  );
}
export default Recipes;
