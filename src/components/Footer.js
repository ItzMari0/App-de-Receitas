import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => {
          history.push('/drinks');
        } }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink"
        />
        Drinks
      </button>
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => {
          history.push('/meals');
        } }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal"
        />
        Meals
      </button>
    </footer>
  );
}

export default Footer;
