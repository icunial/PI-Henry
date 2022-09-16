import React from "react";
import { Link } from "react-router-dom";

import styles from "./Landpage.module.css";

import github from "../../images/github.png";

function Landpage() {
  return (
    <div className={styles.container}>
      <div className={styles.footerContainer}>
        <p>Created by: Ignacio Cunial | igsecu@hotmail.com</p>
        <a href="https://github.com/icunial">
          <img src={github} alt="" />
        </a>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <p>HenryDOGS!</p>
        </div>
        <div className={styles.description}>
          <p>More than a web about dogs...</p>
        </div>
        <div className={styles.btnContainer}>
          <Link className={styles.btn} to="/home">
            home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landpage;
