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

export { userEmail, userMealsToken, userDrinksToken, doneRecipeToken };
