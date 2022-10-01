const userEmail = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};

const userMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

const userDrinksToken = (token) => {
  localStorage.setItem('drinksToken', token);
};

const doneRecipeToken = (token) => {
  localStorage.setItem('doneRecipes', token);
};

const inProgressRecipes = (token) => {
  localStorage.setItem('inProgressRecipes', token);
};

const favoriteRecipes = (token) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(token));
};

export { userEmail, userMealsToken, userDrinksToken,
  doneRecipeToken, inProgressRecipes, favoriteRecipes };
