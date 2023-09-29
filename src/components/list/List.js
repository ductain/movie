import "./list.scss";
import ListItem from "../listItem/ListItem";
import { Grid } from "@mui/material";

export default function List({ movies, search, title }) {
  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <div className="list">
      <span className="listTitle">{title}</span>
      <div className="container">
        <Grid container>
          {filtered.length > 0 ? (
            filtered.map((m) => (
              <>
                {m.status !== 2 && (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <ListItem key={m.id} movie={m} />
                  </Grid>
                )}
              </>
            ))
          ) : (
            <span>No results found!</span>
          )}
        </Grid>
      </div>
    </div>
  );
}
