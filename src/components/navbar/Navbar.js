import "./navbar.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
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
    return () => (window.onscroll = null);
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <span>Homepage</span>
          </Link>
          <Link
            to={"/about"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>About</span>
          </Link>  
          <Link
            to={"/favorites"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Favorites</span>
          </Link> 
        </div>
        <div className="right">
          {user?.displayName ? (
            <>
              <img src={user.photoURL} alt={user.email} />
              <span>{user.displayName}</span>
              <div className="profile">
                <ArrowDropDownIcon className="icon" />
                <div className="options">
                  <span>
                    <Link
                      to={"/account"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Account
                    </Link>
                  </span>
                  <span onClick={handleSignOut}>Logout</span>
                </div>
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
