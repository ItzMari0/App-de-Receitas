import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchDrinks from '../API/DrinksAPI';
import RecipeAppContext from '../context/RecipeAppContext';

const MAXLIST = 12;
const MAXCATEGORY = 5;

function DrinkRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  const getDrinks = async () => {
    const allRecipes = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
    setToggleFilter((prevState) => !prevState);
  };

  const categoryFetch = async () => {
    const categories = (await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
    setDrinkCategory(categories.filter((_category, index) => index < MAXCATEGORY));
  };
  useEffect(() => {
    getDrinks();
    categoryFetch();
  }, []);

  const handleCategoryFilter = async ({ target }) => {
    const { value } = target;
    const filteredRecipes = (await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`));
    setRecipes(filteredRecipes.filter((_list, index) => index < MAXLIST));
    setToggleFilter((prevState) => !prevState);
  };

  recipes = recipes.filter((_list, index) => index < MAXLIST);

  return (
    <main>
      <div>
        {drinkCategory.map((categoryList, index) => {
          const { strCategory } = categoryList;
          return (
            <button
              type="button"
              name="category"
              key={ index }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ toggleFilter ? handleCategoryFilter : getDrinks }
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
          onClick={ getDrinks }
        >
          All
        </button>
      </div>
      <div>
        {recipes.length > 1 && (
          recipes.map((list, index) => {
            const { strDrink, strDrinkThumb, idDrink } = list;
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ idDrink }
              >
                <Link to={ `/drinks/${idDrink}` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt={ strDrink }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strDrink}
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

export default DrinkRecipesCard;
