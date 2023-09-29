import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Rating from "@mui/material/Rating";
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
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden"; // Import the Hidden component
import "./Dashboard.scss";
import { UserAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = UserAuth();
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

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastItem = (currentPage + 1) * rowsPerPage;
  const indexOfFirstItem = currentPage * rowsPerPage;
  const currentMovie = movie.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <>
      {user?.uid === "zSqtyhPsBuUPSCiCKVMDrBJgYhy2" && (
        <>
          <TableContainer className="table-container">
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
                  <Hidden mdDown>
                    <TableCell>Date</TableCell>
                    <TableCell>Gerne</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Clip</TableCell>
                  </Hidden>
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
                        className="table-image"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell>{data.title}</TableCell>
                    <Hidden mdDown>
                      <TableCell>{data.date}</TableCell>
                      <TableCell>{data.gerne}</TableCell>
                      <TableCell>
                        <Rating value={data.rating} readOnly size="small" />
                      </TableCell>
                      <TableCell>{data.clip}</TableCell>
                    </Hidden>
                    <TableCell className="table-action">
                      <Link to={`/edit/${data.id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => handleDeleteDialogOpen(data.id)}
                          className="delete-icon"
                        />
                      </IconButton>
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
              <DialogContentText>
                Are you sure want to delete?
              </DialogContentText>
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
      )}
    </>
  );
}
