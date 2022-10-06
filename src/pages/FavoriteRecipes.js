import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getStorageFavoriteList, favoriteRecipes } from '../helpers/localStorage';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  const { favorites, setFavorites } = useContext(RecipeAppContext);
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const handleShareClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied((prevState) => !prevState);
  };

  const handleFavoriteClick = (recipe) => {
    const { id } = recipe;
    if (getStorageFavoriteList(id) === false) {
      const addRecipe = [...favorites, recipe];
      setFavorites(addRecipe);
      favoriteRecipes(addRecipe);
    } else {
      const filter = favorites.filter((item) => item.id !== id);
      setFavorites(filter);
      favoriteRecipes(filter);
    }
  };

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn" name="All">All</button>
      <input
        name="Meals"
        type="image"
        data-testid="filter-by-meal-btn"
        src={ mealIcon }
        alt="meals"
      />
      <input
        name="Drinks"
        type="image"
        data-testid="filter-by-drink-btn"
        src={ drinkIcon }
        alt="drinks"
      />
      {favoriteList.map((recipe, index) => {
        const { type, name, image, category, nationality, alcoholicOrNot, id } = recipe;
        if (type === 'meal') {
          return (
            <div key={ recipe }>
              <Link to={ `/meals/${id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${nationality} - ${category}` }
              </p>
              <p>{ nationality }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>Data?</p>
              <p data-testid={ `${index}--horizontal-tag` }>2 primeiras Tags?</p>
              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
                onClick={ () => handleShareClick(type, id) }
              />
              {isCopied && <p>Link copied!</p>}
              <input
                type="image"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite"
                onClick={ () => handleFavoriteClick(recipe) }
              />
            </div>
          );
        }
        return (
          <div key={ recipe }>
            <Link to={ `/drinks/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${alcoholicOrNot} - ${category}` }
            </p>
            <p>Data?</p>
            <p>Tags?</p>
            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ handleShareClick }
            />
            {isCopied && <p>Link copied!</p>}
            <input
              type="image"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
              onClick={ handleFavoriteClick }
            />
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteRecipes;
