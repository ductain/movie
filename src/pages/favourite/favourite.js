import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/list/List";
import "./favorite.scss"; // Import your SCSS file for this component

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    try {
      const getMovies = async () => {
        const res = await axios.get(
          "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies"
        );
        setMovies(res.data);
      };
      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Filter movies with status 1
  const filteredMovies = movies.filter((movie) => movie.status === 1);

  return (
    <div className="favorites-container"> 
      <div className="favorites-content">
        <List movies={filteredMovies} search={searchValue} />
      </div>
    </div>
  );
};

export default Favorites;
