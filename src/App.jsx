import React from 'react'
import Search from './components/Search'
import { useEffect, useState } from 'react'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

function App() {
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true); //Set loading to true to show the loading spinner
    setErrorMessage(null); //Clear any previous error messages

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);

      //Parse the response data
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([]);
        return;
      }
      //Set the movies state clear loading state
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies();

  }, []);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero-Image" />
          <h1>Discover the Top <span className='text-gradient'>movies</span> Currently Trending</h1>
          <Search searchTerm={search} setSearchTerm={setSearch} />
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
          {loading ? (
            <p className='text-white text-center text-base'>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500 text-center text-base'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
