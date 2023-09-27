import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Rating from '@mui/material/Rating';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const [movie, setMovie] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMovieId, setDeleteMovieId] = useState("");
  const baseURL = "https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies";
  const loadMovies = async () => {
    try {
      const res = await axios.get(baseURL);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMovies();
  }, []);
  const deleteMovie = async (id) => {
    try {
      await axios.delete(
        `https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`
      );
      loadMovies();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteDialogOpen = (id) => {
    setDeleteMovieId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteMovie = () => {
    deleteMovie(deleteMovieId);
    setDeleteDialogOpen(false);
  };

  // Add state variables for current page and sliced movie data
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastItem = (currentPage + 1) * rowsPerPage;
  const indexOfFirstItem = currentPage * rowsPerPage;
  const currentMovie = movie.slice(indexOfFirstItem, indexOfLastItem);

  // Create function to handle page changes
  const handlePageChange = (e, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };
  return (
    <>
      <TableContainer style={{ marginTop: "70px" }}>
        <Link
          to={"/add"}
          style={{ textDecoration: "none", marginLeft: "200px" }}
        >
          CREATE A MOVIE
        </Link>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Gerne</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Clip</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell style={{ textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMovie.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>
                  <img
                    src={data.img}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.year}</TableCell>
                <TableCell>{data.gerne}</TableCell>
                <TableCell><Rating value={data.rating} readOnly size="small"/></TableCell>
                <TableCell>{data.clip}</TableCell>
                <TableCell>{data.detail}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "auto",
                    gap: "10px",
                  }}
                >
                  <Link to={`/edit/${data.id}`}>
                    <EditIcon color="primary" />
                  </Link>
                  <DeleteIcon
                    onClick={() => handleDeleteDialogOpen(data.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={movie.length}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMovie} color="error">
            Yes
          </Button>
          <Button onClick={handleDeleteDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
