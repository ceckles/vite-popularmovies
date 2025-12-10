import React from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Hero from './components/Hero'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'


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
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  //Debounce the search input to prevent multiple requests until the user stops typing
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  //Use the useDebounce hook to debounce the search input by waiting 500ms before updating the search
  useDebounce(() => {
    setDebouncedSearch(search);
  }, 500, [search]);

  const fetchMovies = async (query = '') => {
    setLoading(true); //Set loading to true to show the loading spinner
    setErrorMessage(null); //Clear any previous error messages

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc`;
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
      //Update the search count in the database
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
      // Store top movies for hero section (only when not searching)
      if (!query) {
        setTopMovies(data.results);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false); //Set loading to false to hide the loading spinner
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <Hero topMovies={topMovies} />
          <h1>Discover the Top <span className='text-gradient'>movies</span> Currently Trending</h1>
          <Search searchTerm={search} setSearchTerm={setSearch} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500 text-center text-base'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
