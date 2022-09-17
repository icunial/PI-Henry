import React from "react";

import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <p>Dog Created Successfully!</p>
        <button onClick={props.onClose}>Accept</button>
      </div>
    </div>
  );
}

export default Modal;
