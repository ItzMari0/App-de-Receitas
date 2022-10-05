import React, { useEffect, useState } from 'react';
import fetchMeals from '../API/MealsAPI';
import '../styles/recipesImages.css';
import '../styles/carousel.css';

const MAXLIST = 6;

function MealRecommendation() {
  const [recommend, setRecommend] = useState([]);

  const mealRecommendation = async () => {
    const recommendList = await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecommend(recommendList.filter((_meal, index) => index < MAXLIST));
  };

  useEffect(() => {
    mealRecommendation();
  }, []);

  return (
    <div className="carousel-container">
      {recommend.map((meal, index) => (
        <div
          className="recommended-cards"
          data-testid={ `${index}-recommendation-card` }
          key={ index }
        >
          <div className="carousel-card">
            <img
              className="recipes-images"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h4
              data-testid={ `${index}-recommendation-title` }
            >
              {meal.strMeal}
            </h4>
          </div>
        </div>))}
    </div>
  );
}

export default MealRecommendation;
