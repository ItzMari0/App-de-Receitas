const fetchMeals = async (url) => {
  const response = await fetch(url);
  const { meals } = await response.json();
  return meals;
};

export default fetchMeals;
