import React, { useEffect, useState } from "react";
import "./upcoming.scss";
import axios from "axios";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    try {
      const getMovies = async () => {
        const currentDate = new Date();
        const res = await axios.get(
          "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
        );
        const filteredMovies = res.data.filter(
          (movie) => new Date(movie.date) > currentDate
        );
        setMovies(filteredMovies);
      };
      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="upcomingContainer">
      <div className="upcomingContent">
        <div className="list">
          <span className="listTitle">Upcoming movies</span>
          <div className="container">
            <Grid container>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Link to={`/detail/${movie.id}`}>
                    <div className="listItem">
                      <img src={movie.img} alt="" />
                      <div className="info">
                        <p>{movie.title}</p>
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
