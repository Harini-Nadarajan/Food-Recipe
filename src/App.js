import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        'https://yummly2.p.rapidapi.com/feeds/list',
        {
          params: {
            start: 0,
            limit: 20, // Number of recipes to fetch
            tag: 'list.recipe.popular',
          },
          headers: {
            'x-rapidapi-host': 'yummly2.p.rapidapi.com',
            'x-rapidapi-key': '0d25fa2a12msh6f4ed683fc5ab2ap1d6ed9jsn9cccf05958ca', // Your API key
          },
        }
      );
      setRecipes(response.data.feed);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <h1>Harini Food Recipes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="recipe-container">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <img
              src={recipe.display.images[0]}
              alt={recipe.display.displayName}
              className="recipe-image"
            />
            <h3>{recipe.display.displayName}</h3>
            <p>{recipe.content.description.text || 'No description available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
