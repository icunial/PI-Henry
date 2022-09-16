import React from "react";

import styles from "./Loading.module.css";

import loading from "../../images/loading.gif";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src={loading} alt="" />
        <p>LOADING...</p>
      </div>
    </div>
  );
}

export default Loading;
