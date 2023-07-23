import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
export default function AddMovie() {
    const baseURL = 'https://64914d492f2c7ee6c2c7f847.mockapi.io/api/v1/Movies'
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const currentYear = new Date().getFullYear();
    const formik = useFormik({
        initialValues: {
            title: '',
            year: 0,
            img: '',
            clip: '',
            detail: '',
        },
        onSubmit: (values) => {
            try {
                axios.post(baseURL, values)
                setOpen(true)
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            year: Yup.number().integer().required("Required.").typeError("Please type a number.")
            .min(1960, `Must be greater than or equal to 1960`).max(currentYear, `Must be less than or equal to ${currentYear}`),
            img: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            clip: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            detail: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
        })
    })
    return (
        <form onSubmit={formik.handleSubmit} style={{ padding: '100px 50px' }}>
            <h1 style={{ textAlign: 'center' }}>Add a new movie</h1>
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
            {formik.errors.title && formik.touched.title && (<Typography variant='caption' color='red'>{formik.errors.title}</Typography>)}
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
            {formik.errors.year && formik.touched.year && (<Typography variant="caption" color="red">{formik.errors.year}</Typography>)}
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
            {formik.errors.img && formik.touched.img && (<Typography variant="caption" color="red">
                {formik.errors.img}</Typography>)}
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
            {formik.errors.clip && formik.touched.clip && (<Typography variant="caption" color="red">{formik.errors.clip}</Typography>)}
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
            {formik.errors.detail && formik.touched.detail && (<Typography variant="caption" color="red">{formik.errors.detail}</Typography>)}
            <br />
            <Button variant='contained' color="success" type='submit'>Add</Button>
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
                    <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}
