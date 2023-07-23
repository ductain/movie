import { Button, TextField } from '@mui/material'
import React from 'react'

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <form onSubmit={handleSubmit} style={{padding: '100px'}}>
        <h3>Contact us</h3>
        <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
            />
            <Button variant='contained' color="success" type='submit'>Submit</Button>
    </form>
  )
}
