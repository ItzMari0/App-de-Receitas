import React, { useEffect, useState } from 'react';
import fetchDrinks from '../API/DrinksAPI';
import '../styles/recipesImages.css';
import '../styles/carousel.css';

const MAXLIST = 6;

function DrinkRecommendation() {
  const [recommend, setRecommend] = useState([]);

  const drinkRecommendation = async () => {
    const recommendList = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecommend(recommendList.filter((_drink, index) => index < MAXLIST));
  };

  useEffect(() => {
    drinkRecommendation();
  }, []);

  return (
    <div className="carousel-container">
      {recommend.map((drink, index) => (
        <div
          className="recommended-cards"
          data-testid={ `${index}-recommendation-card` }
          key={ index }
        >
          <div className="carousel-card">
            <img
              className="recipes-images"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <h4
              data-testid={ `${index}-recommendation-title` }
            >
              {drink.strDrink}
            </h4>
          </div>
        </div>))}
    </div>
  );
}

export default DrinkRecommendation;
