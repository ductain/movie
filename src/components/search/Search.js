import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./search.scss";
import { Link } from "react-router-dom";
export default function Search({ setSearchValue, movies }) {
  const [input, setInput] = useState("");
  const [newFilter, setNewFilter] = useState([]);
  useEffect(() => {
    if (input === "") {
      setNewFilter([]);
    } else {
      setNewFilter(
        movies.filter((value) => {
          return value.title.toLowerCase().includes(input.toLowerCase());
        })
      );
    }
  }, [movies, input]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      setSearchValue(input);
      setNewFilter([])
    }
  };
  return (
    <div className="search">
      <div className="searchContainer">
        <input
          type="text"
          value={input}
          placeholder="Search movie by name"
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <SearchIcon style={{ color: "white" }} />
      </div>
      {newFilter.length !== 0 && (
        <div className="searchData">
          {newFilter.slice(0, 15).map((value) => (
            <Link
              to={`/detail/${value.id}`}
              style={{ textDecoration: "none" }}
              key={value.id}
            >
              <div className="searchItem">
                <img src={value.img} alt="" />
                <span>{value.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
