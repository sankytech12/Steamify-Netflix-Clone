import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from '../store';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';

const TVShow = () => {
const [isScrolled, setIsScrolled] = useState(false);
const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  },);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded]);

  if(!isLoggedIn){
    navigate('/login');
  }

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;

export default TVShow;