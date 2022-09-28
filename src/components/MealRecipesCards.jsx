import React, { useContext, useEffect, useState } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import fetchMeals from '../API/MealsAPI';

const MAXLIST = 12;
const MAXCATEGORY = 5;

function MealRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);
  const [mealCategory, setMealCategory] = useState([]);

  const getMeals = async () => {
    const allRecipes = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
  };

  const categoryFetch = async () => {
    const categories = (await fetchMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
    setMealCategory(categories.filter((_category, index) => index < MAXCATEGORY));
  };

  useEffect(() => {
    getMeals();
    categoryFetch();
  }, []);

  const handleCategoryFilter = async ({ target }) => {
    const { value } = target;
    const filteredRecipes = (await fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`));
    setRecipes(filteredRecipes.filter((_list, index) => index < MAXLIST));
  };

  recipes = recipes.filter((_list, index) => index < MAXLIST);

  return (
    <main>
      <div>
        {mealCategory.map((categoryList, index) => {
          const { strCategory } = categoryList;
          return (
            <button
              type="button"
              name="category"
              key={ index }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleCategoryFilter }
            >
              {strCategory}
            </button>
          );
        })}
      </div>
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
