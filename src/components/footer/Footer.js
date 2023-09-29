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
        padding: "50px 10%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          {/* Section 1 */}
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            We are a leading company in the industry, providing innovative solutions to our customers.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Section 2 */}
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Phone: 123-456-7890<br />
            Email: info@example.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Section 3 */}
          <Typography variant="h6" gutterBottom>
            Links
          </Typography>
          <Typography variant="body2">
            <ul className="itemList">
              <li>Home</li>
              <li>About</li>
              <li>Products</li>
              <li>Contact</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* Social Media Icons */}
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
    </Box>
  );
};

export default Footer;