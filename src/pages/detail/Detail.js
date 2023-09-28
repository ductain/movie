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
import {
  Snackbar,
  Alert,
  IconButton,
  Typography,
  Chip,
  Box,
  Grid,
  Button,
} from "@mui/material";
import CustomAlert from "../../components/snackbar/alert";
import Tooltip from "@mui/material/Tooltip";

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
      const newStatus = content.status === 0 ? 1 : 0;
      await axios.put(
        `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`,
        {
          status: newStatus,
        }
      );

      setContent((prevContent) => ({
        ...prevContent,
        status: newStatus,
      }));

      if (newStatus === 1) {
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

  return (
    <Grid container className="container">
      {/* Background container */}
      {/* <Grid item xs={12} sx={{ border: "5px solid #209020" }}> */}
      {/* <div className="background-container"> */}
      {/* Background image */}
      {/* <div className="background-image" /> */}
      {/* Transparent gradient overlay */}
      {/* <div className="background-overlay" /> */}
      {/* </div> */}
      {/* </Grid> */}

      {/* Main container */}
      {/* <Grid item xs={12} className="detail-section">
        <Grid container sx={{ border: "5px solid #000" }} alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ border: "5px solid #902390" }}
            className="left"
          > */}
      {/* Content for the left column */}

      {/* <div className="img-wrapper" style={{ border: "2px solid #000" }}>
              <img src={content.img} alt="movie poster" />
            </div> */}
      {/* <img src={content.img} alt="movie poster" /> */}
      {/* </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{ border: "5px solid #902390" }}
            className="right"
          > */}
      {/* Content for the right column */}
      {/* <Typography variant="h4" component="div" gutterBottom>
              {content.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Publish Date: {format(publishDate, "dd/MM/yyyy")}
            </Typography>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography variant="body1" color="text.primary">
                Genre:
              </Typography>
              <Chip label={content.gerne} color="error" />
            </Box>
            <Rating
              name="read-only"
              value={content.rating}
              style={{ display: "flex" }}
              readOnly
            />
            <Typography variant="body1" color="text.primary" paragraph>
              {content.detail}
            </Typography>

            <Grid container>
              <Grid item></Grid>
              <Tooltip
                title={
                  content.status === 0
                    ? "Add to Favorites"
                    : "Remove from Favorites"
                }
              >
                <IconButton onClick={handleToggleStatus}>
                  {content.status === 0 ? (
                    <FavoriteIcon fontSize="large" color="disabled" />
                  ) : (
                    <FavoriteIcon fontSize="large" color="error" />
                  )}
                </IconButton>
              </Tooltip>
              <Link
                to={`/watch/${content.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="error" size="large">
                  <PlayArrowIcon className="icon" />
                </Button>
              </Link>
              <CustomAlert
                open={snackbarOpen}
                variant={snackbarVariant}
                message={snackbarMessage}
                handleClose={() => setSnackbarOpen(false)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="similar">
        <Grid items></Grid>
        <Grid items></Grid>
      </Grid> */}

      <Box className="bg-img">
        <Grid
          className="overlay"
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={8}
            sx={{ m: 1, border: "2px solid #f5f5f5" }}
            className="data-grid"
          >
            <div>
              <Typography variant="h4">{content.title}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  // border: "2px solid #f5f5f5",
                }}
              >
                <Typography
                  variant="h6"
                  // sx={{ m: 1, color: "#53ca53", border: "2px solid #f5f5f5" }}
                >
                  Rating:
                </Typography>
                <Rating
                  name="read-only"
                  value={content.rating}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "f5f5f5",
                    border: "2px solid #f5f5f5",
                  }}
                  readOnly
                />
                <Typography
                  variant="h6"
                  // sx={{ m: 1, border: "2px solid #f5f5f5" }}
                >
                  Release Date: {format(publishDate, "dd/MM/yyyy")}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                // sx={{ m: 1, border: "2px solid #f5f5f5" }}
              >
                Genre: <Chip label={content.gerne} color="error" />
              </Typography>

              <Typography
                variant="body1"
                // sx={{ m: 1, color: "#606060", border: "2px solid #f5f5f5" }}
              >
                Description: {content.detail}
              </Typography>

              <Tooltip
                title={
                  content.status === 0
                    ? "Add to Favorites"
                    : "Remove from Favorites"
                }
              >
                <IconButton onClick={handleToggleStatus}>
                  {content.status === 0 ? (
                    <FavoriteBorderIcon fontSize="large" color="error" />
                  ) : (
                    <FavoriteIcon fontSize="large" color="error" />
                  )}
                </IconButton>
              </Tooltip>
              <Link
                to={`/watch/${content.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="error" size="large">
                  <PlayArrowIcon className="icon" />
                </Button>
              </Link>
              <CustomAlert
                open={snackbarOpen}
                variant={snackbarVariant}
                message={snackbarMessage}
                handleClose={() => setSnackbarOpen(false)}
              />
            </div>
          </Grid>
          <Grid item xs={3} sx={{ m: 1, border: "2px solid #f5f5f5" }}>
            <div className="img-wrapper" style={{ border: "2px solid #000" }}>
              <img src={content.img} alt="movie poster" />
            </div>
          </Grid>
        </Grid>
      </Box>
      {/* <div className="detail" style={{ border: "2px solid #f5f5f5" }}>
          <div className="left" style={{ border: "2px solid #f5f5f5" }}>
            <div className="img-wrapper" style={{ border: "2px solid #f5f5f5" }}>
              <img src={content.img} alt="movie poster" />
            </div>
            <Link to={`/watch/${content.id}`} style={{ color: "black" }}>
              <div className="watchButton">
                <PlayCircleIcon className="icon" />
                <span>WATCH MOVIE</span>
              </div>
            </Link>
          </div> */}
      {/* 
          <div className="right">
            <Typography variant="h4" component="div" gutterBottom>
              {content.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Publish Date: {format(publishDate, "dd/MM/yyyy")}
            </Typography>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography variant="body1" color="text.primary">
                Genre:
              </Typography>
              <Chip label={content.gerne} color="error" />
            </Box>
            <Rating
              name="read-only"
              value={content.rating}
              style={{ display: "flex" }}
              readOnly
            />
            <Typography variant="body1" color="text.primary" paragraph>
              {content.detail}
            </Typography>
            <Tooltip
              title={
                content.status === 0
                  ? "Add to Favorites"
                  : "Remove from Favorites"
              }
            >
              <IconButton onClick={handleToggleStatus}>
                {content.status === 0 ? (
                  <FavoriteIcon style={{ fontSize: 40, color: "gray" }} />
                ) : (
                  <FavoriteIcon style={{ fontSize: 40, color: "red" }} />
                )}
              </IconButton>
            </Tooltip>
          </div>
  
          <CustomAlert
            open={snackbarOpen}
            variant={snackbarVariant}
            message={snackbarMessage}
            handleClose={() => setSnackbarOpen(false)}
          />
        </div> */}
    </Grid>
  );
}
