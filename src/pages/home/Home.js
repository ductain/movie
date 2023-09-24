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
  return (
    <div className="home">
      <Featured />
      <Search setSearchValue={setSearchValue} movies={movies} />
      <List movies={movies} search={searchValue} />
    </div>
  );
};

export default Home;
