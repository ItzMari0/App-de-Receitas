import React, { useContext, useEffect, useState } from 'react';
import fetchDrinks from '../API/DrinksAPI';
import RecipeAppContext from '../context/RecipeAppContext';

const MAXLIST = 12;
const MAXCATEGORY = 5;

function DrinkRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);
  const [drinkCategory, setDrinkCategory] = useState([]);

  const getDrinks = async () => {
    const allRecipes = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
  };

  const categoryFetch = async () => {
    const categories = (await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
    setDrinkCategory(categories.filter((_category, index) => index < MAXCATEGORY));
  };
  useEffect(() => {
    getDrinks();
    categoryFetch();
  }, []);

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
              // onClick={ }
            >
              {strCategory}
            </button>
          );
        })}
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
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default DrinkRecipesCard;
