import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const recipeAppStates = useMemo(
    () => ({ login,
      setLogin,
      disabled,
      setDisabled,
      recipes,
      setRecipes,
      favorites,
      setFavorites,
    }),
    [login,
      setLogin,
      disabled,
      setDisabled,
      recipes,
      setRecipes,
      favorites,
      setFavorites,
    ],
  );

  return (
    <RecipeAppContext.Provider value={ recipeAppStates }>
      { children }
    </RecipeAppContext.Provider>
  );
}

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeAppProvider;
