import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/logo1-removebg-preview-2.png";
import { Typography, Button, Menu, MenuItem } from "@mui/material";
const Navbar = () => {
  const { user, logOut, googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          {user?.uid !== "zSqtyhPsBuUPSCiCKVMDrBJgYhy2" ? (
            <Link to={"/"}>
              <img src={logo} alt="Logo" />
            </Link>
          ) : (
            <img src={logo} alt="Logo" />
          )}
          {user?.uid !== "zSqtyhPsBuUPSCiCKVMDrBJgYhy2" ? (
            <>
              <Link to={"/"}>
                <Button className="red-hover">Homepage</Button>
              </Link>
              <Link to={"/about"}>
                <Button className="red-hover">About</Button>
              </Link>
              {user && (
                <Link to={"/favorites"}>
                  <Button className="red-hover">Favorites</Button>
                </Link>
              )}
              <Link to={"/upcoming"}>
                <Button className="red-hover">Upcoming</Button>
              </Link>
              <Link to={"/recommend"}>
                <Button className="red-hover">Recommendation</Button>
              </Link>
            </>
          ) : (
            <Link to={"/admin"}>
              <Button className="red-hover">Admin</Button>
            </Link>
          )}
        </div>
        <div className="right">
          {user?.displayName ? (
            <>
              {/* <img src={user.photoURL} alt={user.email} /> */}

              <Typography className="hidden">{user.displayName}</Typography>
              <div className="profile">
                <IconButton
                  className="icon"
                  onClick={handleMenuOpen}
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl)}
                >
                  <img src={user.photoURL} alt={user.email} />
                </IconButton>
                <Menu
                  sx={{
                    ".MuiMenu-paper": {
                      backgroundColor: "var(--main-color)", // Set the menu background color to black
                    },
                    ".MuiMenuItem-root": {
                      color: "white", // Set the menu item text color to white
                    },
                  }}
                  // id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  getContentAnchorEl={null}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to={"/account"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <Button
              onClick={handleGoogleSignIn}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
