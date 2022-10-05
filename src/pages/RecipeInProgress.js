import React from 'react';
import { useLocation } from 'react-router-dom';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress() {
  const location = useLocation();

  return (
    <div>
      {location.pathname.includes('/meals')
        ? <MealInProgress /> : <DrinkInProgress />}
    </div>
  );
}

export default RecipeInProgress;
