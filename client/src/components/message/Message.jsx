import React from "react";

import styles from "./Message.module.css";

function Message(props) {
  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <p>UPS!</p>
        <div>{props.message}</div>
      </div>
    </div>
  );
}

export default Message;
