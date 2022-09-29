import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealRecipe from './pages/MealRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import RecipeAppProvider from './context/RecipeAppProvider';
import RecipeDetails from './components/RecipeDetails';

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
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        {/*
        <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } /> */}
      </RecipeAppProvider>
    </Switch>
  );
}

export default App;
