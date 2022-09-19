import React from "react";
import styles from "./DogCard.module.css";

import { Link } from "react-router-dom";
import {
  getDogById,
  addFavourite,
  removeFavourite,
  getComments,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

function DogCard(props) {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites);

  const isInFavourites = (id) => {
    for (let x = 0; x < favourites.length; x++) {
      if (favourites[x].id === id) return true;
    }
    return false;
  };

  const divImage = {
    backgroundImage: "url(" + `${props.image}` + ")",
  };

  const dog = {
    id: props.id,
    name: props.name,
    image: props.image,
    temperament: props.temperament,
    weight: props.weight,
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
          <button
            className={
              isInFavourites(props.id)
                ? styles.removeFavourite
                : styles.addFavourite
            }
            onClick={() => {
              isInFavourites(props.id)
                ? dispatch(removeFavourite(props.id))
                : dispatch(addFavourite(dog));
            }}
          >
            {!isInFavourites(props.id)
              ? "Add to favourites"
              : "Remove from favourites"}
          </button>
          <Link
            to={`/dogs/${props.id}`}
            className={styles.link}
            onClick={(e) => {
              dispatch(getDogById(props.id));
              dispatch(getComments(props.id));
            }}
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DogCard;
