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
      const sortedMoviesData = moviesData.sort((a, b) => b.date - a.date);
      const newestMovie = sortedMoviesData[0];
      setMovie(newestMovie);
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
