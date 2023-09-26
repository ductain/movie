import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/logo1-removebg-preview-2.png";

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
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <span>Homepage</span>
          </Link>
          <Link
            to={"/about"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>About</span>
          </Link>
        </div>
        <div className="right">
          {user?.displayName ? (
            <>
              {/* <img src={user.photoURL} alt={user.email} /> */}
              <span>{user.displayName}</span>
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
