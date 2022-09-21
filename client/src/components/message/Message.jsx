import React from "react";
import { useSelector } from "react-redux";

import styles from "./Message.module.css";

function Message() {
  const message = useSelector((state) => state.dogs);

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <p>UPS!</p>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Message;
