import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let pageTitle = '';
  let showSearchIcon = true;

  if (location.pathname === '/meals') {
    pageTitle = 'Meals';
  }

  if (location.pathname === '/drinks') {
    pageTitle = 'Drinks';
  }

  if (location.pathname === '/profile') {
    pageTitle = 'Profile';
    showSearchIcon = false;
  }

  if (location.pathname === '/done-recipes') {
    pageTitle = 'Done Recipes';
    showSearchIcon = false;
  }

  if (location.pathname === '/favorite-recipes') {
    pageTitle = 'Favorite Recipes';
    showSearchIcon = false;
  }

  const handleProfileCLick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setSearchBar((prevState) => !prevState);
  };

  return (
    <header>
      <h2 data-testid="page-title">{pageTitle}</h2>
      <button type="button" onClick={ handleProfileCLick }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </button>
      {showSearchIcon && (
        <button type="button" onClick={ handleSearchClick }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search"
          />
        </button>)}
      {searchBar && (
        <SearchBar history={ history } />) }
    </header>
  );
}

export default Header;
