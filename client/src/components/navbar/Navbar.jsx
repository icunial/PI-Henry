import React from "react";
import { useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import stylesLight from "./Navbar.module.css";
import stylesDark from "./NavbarDark.module.css";

function Navbar() {
  const theme = useSelector((state) => state.theme);
  const location = useLocation();

  let styles = theme ? stylesLight : stylesDark;

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>HenryDOGS!</h1>
        <div className={styles.links}>
          {location.pathname !== "/home" && (
            <Link to="/home" className={styles.link}>
              Home
            </Link>
          )}
          {location.pathname !== "/form" && (
            <Link to="/form" className={styles.link}>
              Create New Dog
            </Link>
          )}
          {location.pathname !== "/favourites" && (
            <Link to="/favourites" className={styles.link}>
              My Favourites
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
