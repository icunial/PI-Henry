import React from "react";
import styles from "./DogCard.module.css";

import { Link } from "react-router-dom";
import { getDogById } from "../../store/actions";
import { useDispatch } from "react-redux";

function DogCard(props) {
  const dispatch = useDispatch();

  const divImage = {
    backgroundImage: "url(" + `${props.image}` + ")",
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.imageContainer}
        style={props.image && divImage}
      ></div>
      <div className={styles.infoContainer}>
        <div className={styles.headerInfo}>
          <p className={styles.titleItem}>{props.name.toUpperCase()}</p>
          <p className={styles.weightItem}>
            <span>WEIGHT: </span>
            {props.weight}
          </p>
        </div>
        <div className={styles.temperaments}>
          {props.temperament.map((t, index) => (
            <span key={index}>{t}</span>
          ))}
        </div>
        <div className={styles.linkContainer}>
          <Link
            to={`/dogs/${props.id}`}
            className={styles.link}
            onClick={(e) => dispatch(getDogById(props.id))}
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DogCard;
