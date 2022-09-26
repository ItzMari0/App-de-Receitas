const fetchDrinks = async (url) => {
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};

export default fetchDrinks;
