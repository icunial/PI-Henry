import React from "react";

import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
