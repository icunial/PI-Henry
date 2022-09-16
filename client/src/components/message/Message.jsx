import React from "react";
import styles from "./Message.module.css";

function Message(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ups!</h1>
      <h2>{props.text}</h2>
    </div>
  );
}

export default Message;
