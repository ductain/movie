import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Featured() {
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    try {
      const res = await axios.get(
        "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
      );
      const moviesData = res.data;
      
      // Get an array of movies for the current year
      const currentYear = new Date().getFullYear();
      const moviesForCurrentYear = moviesData.filter(movie => {
        const movieYear = new Date(movie.year).getFullYear();
        return movieYear === currentYear;
      });
      
      // Get a random movie from the moviesForCurrentYear array
      const randomIndex = Math.floor(Math.random() * moviesForCurrentYear.length);
      const randomMovie = moviesForCurrentYear[randomIndex];
      
      setMovie(randomMovie);
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className="featured">
      <img src={movie.img} alt="featured movie" />
      <div className="info">
        <h1>{movie.title}</h1>
        <span>{movie.year}</span>
        <span className="desc">{movie.detail}</span>
        <div className="buttons">
          <Link to={`/watch/${movie.id}`} style={{ textDecoration: "none" }}>
            <button className="play">
              <PlayArrowIcon />
              <span>Play</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
