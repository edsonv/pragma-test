import React, { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";

function MovieList() {
  const [movieList, setMovieList] = useState([])
  const [search, setSearch] = useState('')
  const searchInput = useRef(null)
  const [firstRender, setFirstRender] = useState(true)
  const [hasResults, setHasResults] = useState(null)


  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  useEffect(() => {
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${search}`)
      .then(response => response.json())
      .then(response => {
        if (response.data.length > 0) {
          setMovieList(response.data)
          setHasResults(true)
        } else {
          if (firstRender) {
            setFirstRender(false)
            setHasResults(true)
          } else {
            setFirstRender(false)
            setHasResults(false)
          }
        }
      })
  }, [search])

  console.log(movieList)
  return (
    < div className="layout-column align-items-center mt-50" >
      <section className="layout-row align-items-center justify-content-center">
        <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" ref={searchInput} defaultValue={search} />
        <button className="" data-testid="submit-button" onClick={() => handleSearch()}>Search</button>
      </section>
      {
        hasResults === false ? (
          <div className="mt-50 slide-up-fade-in" data-testid="no-result">No result</div>
        ) :
          movieList && (
            <ul className="mt-50 styled" data-testid="movieList">
              {
                movieList.map(movie => (
                  <li className="slide-up-fade-in py-10" key={movie.imdbID}>{movie.Title}</li>
                ))
              }
            </ul>
          )
      }

    </div >
  );
}

export default MovieList