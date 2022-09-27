import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '' });

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">
          { user.email }
        </p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => {
            history.push('/done-recipes');
          } }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => {
            history.push('/favorite-recipes');
          } }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear('');
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
