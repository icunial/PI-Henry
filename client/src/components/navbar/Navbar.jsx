import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import stylesLight from "./Navbar.module.css";
import stylesDark from "./NavbarDark.module.css";

function Navbar() {
  const theme = useSelector((state) => state.theme);

  let styles = stylesLight;
  theme ? (styles = stylesLight) : (styles = stylesDark);

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>HenryDOGS!</h1>
        <div className={styles.links}>
          <Link to="/home" className={styles.link}>
            Home
          </Link>
          <Link to="/form" className={styles.link}>
            Create New Dog
          </Link>
          <Link to="/favourites" className={styles.link}>
            My Favourites
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
