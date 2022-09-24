import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  const recipeAppStates = useMemo(
    () => ({ login, setLogin, disabled, setDisabled }),
    [login, setLogin, disabled, setDisabled],
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
