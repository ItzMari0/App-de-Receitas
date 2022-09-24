import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeAppProvider from './context/RecipeAppProvider';

function App() {
  return (
    <Switch>
      <RecipeAppProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        {/* <Route exact path="/meals/:id" component={ MealRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } /> */}
      </RecipeAppProvider>
    </Switch>
  );
}

export default App;
