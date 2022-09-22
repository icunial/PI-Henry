import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import DogCard from "../dogcard/DogCard";

import styles from "./Favourites.module.css";

function Favourites() {
  const favourites = useSelector((state) => state.favourites);

  return (
    <div className={styles.globalContainer}>
      <Navbar />
      {!favourites.length && (
        <div className={styles.message}>You do not have favourites dogs!</div>
      )}
      <div className={styles.container}>
        <div className={styles.dogContainer}>
          {favourites.map((dog) => (
            <DogCard
              className={styles.dogCard}
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              temperament={dog.temperament}
              weight={dog.weight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favourites;
