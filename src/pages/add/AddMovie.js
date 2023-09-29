import {
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { UserAuth } from "../../context/AuthContext";
export default function AddMovie() {
  const { user } = UserAuth();
  const baseURL = "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies";
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  //gerne option value. You can add more option here
  const options = [
    {
      value: "War",
    },
    {
      value: "History",
    },
    {
      value: "Animation",
    },
    {
      value: "Action",
    },
    {
      value: "Comedy",
    },
    {
      value: "Thriller",
    },
    {
      value: "Drama",
    },
    {
      value: "Romance",
    },
    {
      value: "Sci-fi",
    },
    {
      value: "Fantasy",
    },
    {
      value: "Adventure",
    },
  ];
  const formik = useFormik({
    initialValues: {
      title: "",
      date: new Date(),
      gerne: "",
      rating: 0,
      img: "",
      clip: "",
      detail: "",
      status: 0,
      favorite: 0
    },
    onSubmit: (values) => {
      try {
        axios.post(baseURL, values);
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      date: Yup.string()
      .required("Required."),

      gerne: Yup.string().required("Required."), //require select gerne
      img: Yup.string()
        .required("Image URL is required")
        .min(10, "Must be 10 characters or more"),
      clip: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      detail: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
    }),
  });
  return (
    <>
      {user?.uid === "zSqtyhPsBuUPSCiCKVMDrBJgYhy2" && (
        <>
          <form
            onSubmit={formik.handleSubmit}
            style={{ padding: "100px 50px" }}
          >
            <h1 style={{ textAlign: "center" }}>Add a new movie</h1>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <Typography variant="caption" color="red">
                {formik.errors.title}
              </Typography>
            )}
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              variant="standard"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            {formik.errors.date && formik.touched.date && (
              <Typography variant="caption" color="red">
                {formik.errors.date}
              </Typography>
            )}
            {/*gerne select here*/}
            <TextField
              margin="dense"
              name="gerne"
              label="Select A Gerne"
              select
              fullWidth
              variant="standard"
              value={formik.values.gerne}
              onChange={formik.handleChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {formik.errors.gerne && formik.touched.gerne && (
              <Typography variant="caption" color="red">
                {formik.errors.gerne}
              </Typography>
            )}
            {/*Rating*/}
            <Typography component="legend" variant="caption">
              Rating
            </Typography>
            <Rating
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
              size="large"
            />
            <TextField
              margin="dense"
              name="img"
              label="URL of image"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.img}
              onChange={formik.handleChange}
            />
            {formik.errors.img && formik.touched.img && (
              <Typography variant="caption" color="red">
                {formik.errors.img}
              </Typography>
            )}
            <TextField
              margin="dense"
              name="clip"
              label="URL of clip"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.clip}
              onChange={formik.handleChange}
            />
            {formik.errors.clip && formik.touched.clip && (
              <Typography variant="caption" color="red">
                {formik.errors.clip}
              </Typography>
            )}
            <TextField
              margin="dense"
              name="detail"
              label="Detail"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.detail}
              onChange={formik.handleChange}
            />
            {formik.errors.detail && formik.touched.detail && (
              <Typography variant="caption" color="red">
                {formik.errors.detail}
              </Typography>
            )}
            <br />
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Congraturation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Alert severity="success">
                    <AlertTitle>Adding successful!</AlertTitle>
                  </Alert>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button>
                  <Link to="/admin" style={{ textDecoration: "none" }}>
                    Dashboard
                  </Link>
                </Button>
                <Button autoFocus onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </>
      )}
    </>
  );
}
