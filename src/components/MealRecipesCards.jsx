import React, { useContext, useEffect } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import fetchMeals from '../API/MealsAPI';

const MAXLIST = 12;

function MealRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);

  const getMeals = async () => {
    const allRecipes = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
  };

  useEffect(() => {
    getMeals();
  }, []);

  recipes = recipes.filter((_list, index) => index < MAXLIST);

  return (
    <main>
      <div>
        {recipes.length > 1 && (
          recipes.map((list, index) => {
            const { strMeal, strMealThumb, idMeal } = list;
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ idMeal }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {strMeal}
                </p>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default MealRecipesCard;
