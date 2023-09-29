import { useEffect, useState } from "react";
import "./detail.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Rating from "@mui/material/Rating";
import { format } from "date-fns";
import { IconButton, Typography, Chip, Box, Grid, Button } from "@mui/material";
import CustomAlert from "../../components/snackbar/alert";
import Tooltip from "@mui/material/Tooltip";

import RandomMovieList from "./RandomMovieList";
import { UserAuth } from "../../context/AuthContext";

export default function Detail() {
  const { id } = useParams();
  const [content, setContent] = useState({
    img: "",
    title: "",
    date: new Date(),
    detail: "",
    status: 0,
    rating: 0,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success");

  useEffect(() => {
    try {
      const loadMovie = async () => {
        const res = await axios.get(
          `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`
        );
        setContent(res.data);
        document.querySelector(
          ".bg-img"
        ).style.backgroundImage = `url(${res.data.img})`;
      };
      loadMovie();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleToggleStatus = async () => {
    try {
      const newFavorite = content.favorite === 0 ? 1 : 0;
      await axios.put(
        `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`,
        {
          favorite: newFavorite,
        }
      );

      setContent((prevContent) => ({
        ...prevContent,
        favorite: newFavorite,
      }));

      if (newFavorite === 1) {
        setSnackbarMessage("Added to favorites!");
        setSnackbarVariant("success");
      } else {
        setSnackbarMessage("Removed from favorites!");
        setSnackbarVariant("warning");
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Error occurred. Please try again.");
      setSnackbarVariant("error");
      setSnackbarOpen(true);
    }
  };

  const publishDate = new Date(content.date);
  const { user } = UserAuth();
  return (
    // <Grid container className="container-detail">
    <div className="bg-img">
      {/* <img src={content.img} alt="" /> */}

      <div className="detail-container">
        {/* <div className="overlay1"> */}
        <Box className="overlay1">
          <Box className="detail">
            <Box className="data-box">
              <Box className="img-wrapper">
                <img src={content.img} alt="movie poster" />
              </Box>
              <Box sx={{ color: "white" }} className="data-wrapper">
                <Typography variant="h4" className="movieTitle">
                  {content.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  className="rating-date"
                >
                  <Typography variant="h6">Rating:</Typography>
                  <Rating name="read-only" value={content.rating} readOnly />
                  <Typography variant="h6">
                    Release Date: {format(publishDate, "dd/MM/yyyy")}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Genre: <Chip label={content.gerne} color="error" />
                </Typography>
                <Typography variant="body1">
                  Description: {content.detail}
                </Typography>
                <Box
                  sx={{
                    float: "right",
                    padding: "30px 0px",
                  }}
                >
                  {user && (
                    <Tooltip
                      title={
                        content.favorite === 0
                          ? "Add to Favorites"
                          : "Remove from Favorites"
                      }
                    >
                      <Button
                        onClick={handleToggleStatus}
                        color="inherit"
                        variant="outlined"
                        size="large"
                        sx={{ marginRight: "16px" }} // Add right margin to this button
                      >
                        {content.favorite === 0 ? (
                          <FavoriteBorderIcon fontSize="medium" />
                        ) : (
                          <FavoriteIcon fontSize="medium" />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                  <Link to={`/watch/${content.id}`}>
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                    >
                      Watch
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <CustomAlert
          open={snackbarOpen}
          variant={snackbarVariant}
          message={snackbarMessage}
          handleClose={() => setSnackbarOpen(false)}
        />
        {/* </div> */}

        <div className="overlay2">
          <div className="randomMovie">
            <RandomMovieList />
          </div>
        </div>
      </div>
    </div>
    // </Grid>
  );
}
