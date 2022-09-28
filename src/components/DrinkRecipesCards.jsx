import React, { useContext, useEffect } from 'react';
import fetchDrinks from '../API/DrinksAPI';
import RecipeAppContext from '../context/RecipeAppContext';

const MAXLIST = 12;

function DrinkRecipesCard() {
  let { recipes } = useContext(RecipeAppContext);
  const { setRecipes } = useContext(RecipeAppContext);

  const getDrinks = async () => {
    const allRecipes = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecipes(allRecipes);
  };

  useEffect(() => {
    getDrinks();
  }, []);

  recipes = recipes.filter((_list, index) => index < MAXLIST);

  return (
    <main>
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
