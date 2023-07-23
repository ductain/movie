import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [movie, setMovie] = useState([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteMovieId, setDeleteMovieId] = useState('');
    const baseURL = 'https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies'
    const loadMovies = async () => {
        try {
            const res = await axios.get(baseURL)
            setMovie(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadMovies()
    }, [])
    const deleteMovie = async (id) => {
        try {
            await axios.delete(`https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies/${id}`)
            loadMovies()
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteDialogOpen = (id) => {
        setDeleteMovieId(id);
        setDeleteDialogOpen(true);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    }

    const handleDeleteMovie = () => {
        deleteMovie(deleteMovieId);
        setDeleteDialogOpen(false);
    }
    return (
        <>
            <TableContainer style={{ padding: '60px 10px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center' }}>id</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Image</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Title</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Year</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Clip</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Detail</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movie.map((data) => (

                            <TableRow
                                key={data.id}
                            >
                                <TableCell>
                                    {data.id}
                                </TableCell>
                                <TableCell><img src={data.img} alt="" style={{ width: '40px', height: '40px' }} /></TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.year}</TableCell>
                                <TableCell>{data.clip}</TableCell>
                                <TableCell>{data.detail}</TableCell>
                                <TableCell style={{ display: 'flex', flexDirection: 'column', alignItem: 'center' }}>
                                    <Link to={`/edit/${data.id}`}>
                                        <Button color='success'>Edit</Button>
                                    </Link>
                                    <Button onClick={() => handleDeleteDialogOpen(data.id)} color="error">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
    )
}
