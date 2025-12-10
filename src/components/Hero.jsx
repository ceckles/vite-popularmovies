import React, { useEffect, useState } from 'react'

const Hero = ({ topMovies = [] }) => {
  const [featuredMovies, setFeaturedMovies] = useState([])

  useEffect(() => {
    if (topMovies.length >= 3) {
      // Get top 10 movies
      const top10 = topMovies.slice(0, 10)
      // Randomly select 3 movies
      const shuffled = [...top10].sort(() => 0.5 - Math.random())
      setFeaturedMovies(shuffled.slice(0, 3))
    }
  }, [topMovies])

  if (featuredMovies.length === 0) {
    return null
  }

  return (
    <div className="hero-movies">
      {featuredMovies.map((movie, index) => {
        // Calculate positions for overlapping effect - more spread out
        const offsetX = (index - 1) * 140 // Center the middle one, spread others more
        const rotation = (index - 1) * 12 // Rotate each poster more for fan effect
        const zIndex = 3 - Math.abs(index - 1) // Middle one on top
        
        return (
          <div 
            key={movie.id} 
            className="hero-movie-poster"
            style={{ 
              zIndex: zIndex,
              transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
            }}
          >
            <img 
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : './NoMovie-Vertical.png'
              } 
              alt={movie.title}
              className="hero-poster-image"
            />
          </div>
        )
      })}
    </div>
  )
}

export default Hero

