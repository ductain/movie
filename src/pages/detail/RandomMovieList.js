// RandomMovieList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RandomMovieList.scss";
import List from "../../components/list/List";


const RandomMovieList = () => {
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        try {
          const fetchRandomMovies = async () => {
            const res = await axios.get(
              "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
            );
            
            // Shuffle the movies array to get random movies
            const shuffledMovies = shuffleArray(res.data);
            
            // Select the first 5 movies as random movies
            const selectedMovies = shuffledMovies.slice(0, 6);
            
            setMovies(selectedMovies);
          };
          
          fetchRandomMovies();
        } catch (error) {
          console.log(error);
        }
      }, []);
     // Configure the settings for the react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }; 
      
    return (
      <div className="random">
        <div className="container-random">          
          <List movies={movies} search={searchValue} title='You may want to watch'/>
        </div>
      </div>
    );
  };

export default RandomMovieList;
