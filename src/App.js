import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import RecipeAppProvider from './context/RecipeAppProvider';

function App() {
  return (
    <Switch>
      <RecipeAppProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </RecipeAppProvider>
    </Switch>
  );
}

export default App;
