import "./list.scss";
import ListItem from "../listItem/ListItem";

export default function List({ movies, search }) {
  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <div className="list">
      <span className="listTitle">List of movies</span>
      <div className="container">
        {filtered.length > 0 ? (
          filtered.map((m) => <ListItem key={m.id} movie={m} />)
        ) : (
          <span>No results found!</span>
        )}
      </div>
    </div>
  );
}
