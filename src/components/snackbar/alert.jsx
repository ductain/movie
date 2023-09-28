import { Snackbar, Alert } from "@mui/material";

export default function CustomAlert({ open, variant, message, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={variant}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
