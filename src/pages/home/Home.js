import axios from "axios";
import { useEffect, useState } from "react";
import Featured from "../../components/features/Featured";
import List from "../../components/list/List";
import "./home.scss";
import Search from "../../components/search/Search";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    try {
      const getMovies = async () => {
        const currentDate = new Date();
        const res = await axios.get(
          "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
        );
        // fetch all movie which date publish <= current date into homepage
        const filteredMovies = res.data.filter(
          (movie) => new Date(movie.date) <= currentDate
        );
        setMovies(filteredMovies);
      };
      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="home">
      <div className="feature">
        <Featured movies={movies}/> {/*set props movie for featured*/}
      </div>
      <div className="container">
        <Search setSearchValue={setSearchValue} movies={movies} />
        <List movies={movies} search={searchValue} />
      </div>
    </div>
  );
};

export default Home;
