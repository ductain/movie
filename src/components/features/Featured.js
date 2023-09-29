import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Featured({ movies }) {
  // const [movies, setMovies] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // const fetchMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
  //     );

  //     if (response.status === 200) {
  //       const moviesData = response.data;

  //       if (moviesData.length > 0) {
  //         setMovies(moviesData);
  //       } else {
  //         console.log("No movies found in the data.");
  //       }
  //     } else {
  //       console.log("Failed to fetch data. Status code: " + response.status);
  //     }
  //   } catch (error) {
  //     console.log("An error occurred while fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   beforeChange: (current, next) => setCurrentSlideIndex(next),
  // };

  return (
    <div className="featured">
      <Slider {...sliderSettings}>
        {movies?.map((movie, index) => (
          <div key={movie.id} className="featured">
            <img src={movie.img} alt={`Featured movie ${index}`} />
            <div className="info">
              <h1>{movie.title}</h1>
              <span>{new Date(movie.date).getFullYear()}</span>{" "}
              {/*get year from date*/}
              <span className="desc">{movie.detail}</span>
              <div className="buttons">
                <Link
                  to={`/watch/${movie.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    transition: "color 0.1s", // Add a smooth color transition
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "red")}
                  onMouseLeave={(e) => (e.target.style.color = "black")} // Reset to the original color on mouse leave
                >
                  <button className="play">
                    <PlayArrowIcon />
                    <span>Play</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="slider-index">
        <span>
          {currentSlideIndex + 1} / {movies.length}
        </span>
      </div>
    </div>
  );
}
