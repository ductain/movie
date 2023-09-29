import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { UserAuth } from "../../context/AuthContext";
export default function Update() {
  const { user } = UserAuth();
  let navigate = useNavigate();
  const { id } = useParams();
  // gerne option value here. You can add more option
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
  const statusOps = [
    {
      label: "Available",
      value: 0,
    },
    {
      label: "Not Available",
      value: 2,
    },
  ];
  const [movie, setMovie] = useState({
    title: "",
    date: new Date(),
    gerne: "",
    rating: 0,
    img: "",
    clip: "",
    detail: "",
    status: 0,
  });
  useEffect(() => {
    try {
      const loadMovie = async () => {
        const res = await axios.get(
          `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`
        );
        setMovie(res.data);
      };
      loadMovie();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: movie.title,
      date: movie.date,
      gerne: movie.gerne,
      rating: movie.rating,
      img: movie.img,
      clip: movie.clip,
      detail: movie.detail,
      status: movie.status,
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`,
          values
        );
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required")
        .min(2, "Must be 2 characters or more"),
      date: Yup.string().required("Required."),
      gerne: Yup.string().required("Required"),
      img: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      clip: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      detail: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      status: Yup.string().required("Required"),
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
            <h1 style={{ textAlign: "center" }}>Update movie</h1>
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
            {formik.errors.title && (
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
            {formik.errors.date && (
              <Typography variant="caption" color="red">
                {formik.errors.date}
              </Typography>
            )}
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
            {formik.errors.img && (
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
            {formik.errors.clip && (
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
            {formik.errors.detail && (
              <Typography variant="caption" color="red">
                {formik.errors.detail}
              </Typography>
            )}
            <TextField
              margin="dense"
              name="status"
              select
              fullWidth
              variant="standard"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              {statusOps.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {formik.errors.status && formik.touched.status && (
              <Typography variant="caption" color="red">
                {formik.errors.status}
              </Typography>
            )}
            <br />
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
          </form>
        </>
      )}
    </>
  );
}
