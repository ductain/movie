import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
export default function Update() {
  let navigate = useNavigate();
  const { id } = useParams();
  const currentYear = new Date().getFullYear();
  const [movie, setMovie] = useState({
    title: "",
    year: 0,
    img: "",
    clip: "",
    detail: "",
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
      year: movie.year,
      img: movie.img,
      clip: movie.clip,
      detail: movie.detail,
    },
    onSubmit: async(values) => {
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
      year: Yup.number()
        .integer()
        .required("Required.")
        .typeError("Please type a number.")
        .min(1960, `Must be greater than or equal to 1960`)
        .max(currentYear, `Must be less than or equal to ${currentYear}`),
      img: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      clip: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      detail: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: "100px 50px" }}>
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
        name="year"
        label="Year"
        type="text"
        fullWidth
        variant="standard"
        value={formik.values.year}
        onChange={formik.handleChange}
      />
      {formik.errors.year && (
        <Typography variant="caption" color="red">
          {formik.errors.year}
        </Typography>
      )}
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
      <br />
      <Button variant="contained" color="success" type="submit">
        Update
      </Button>
    </form>
  );
}
