import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import fetchMeals from '../API/MealsAPI';
import '../styles/recipesImages.css';

const MAXLIST = 12;
const MAXCATEGORY = 5;

function MealRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);
  const [mealCategory, setMealCategory] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  const getMeals = async () => {
    const allRecipes = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
    setToggleFilter((prevState) => !prevState);
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
    setToggleFilter((prevState) => !prevState);
  };

  recipes = recipes.filter((_list, index) => index < MAXLIST);

  return (
    <main>
      <div>
        {mealCategory.map((categoryList) => {
          const { strCategory } = categoryList;
          return (
            <button
              type="button"
              name="category"
              key={ strCategory }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ toggleFilter ? handleCategoryFilter : getMeals }
            >
              {strCategory}
            </button>
          );
        })}
        <button
          type="button"
          name="category"
          value="all"
          data-testid="All-category-filter"
          onClick={ getMeals }
        >
          All
        </button>
      </div>
      <div>
        {recipes.length > 0 && (
          recipes.map((list, index) => {
            const { strMeal, strMealThumb, idMeal } = list;
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ idMeal }
              >
                <Link to={ `/meals/${idMeal}` }>
                  <img
                    className="recipes-images"
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default MealRecipesCard;
