import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Stack, Typography } from "@mui/material";
import './footer.scss'
const Footer = () => {
  return (
    <Box
      className="footer-container"
      sx={{
        backgroundColor: "#202020",
        color: "#f5f5f5",
        padding: "50px 100px",
      }}
    >
      <Grid container spacing={3}>
        <Grid container >
            <Grid item xs={12}>

          <Stack
            direction="row"
            spacing={2}
            sx={{ paddingBottom: 2, fontSize: "24px" }}
            className="stack"
            >
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <YouTubeIcon />
          </Stack>
              </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Section 1
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Section 2
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Section 3
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;