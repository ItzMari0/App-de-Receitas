import React from 'react';
import Header from '../components/Header';
import MealRecipesCard from '../components/MealRecipesCards';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <Header />
      <MealRecipesCard />
      <Footer />
    </div>
  );
}

export default Meals;
