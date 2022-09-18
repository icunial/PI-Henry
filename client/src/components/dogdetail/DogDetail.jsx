import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./DogDetail.module.css";

import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";

import { deleteDog } from "../../store/actions";

function DogDetail() {
  const dog = useSelector((state) => state.dog);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const divImage = {
    backgroundImage: "url(" + `${dog.image}` + ")",
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.globalContainer}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.dogContainer}>
          <div
            className={styles.imageContainer}
            style={dog.image && divImage}
          ></div>
          <div className={styles.contentContainer}>
            <div>
              <div className={styles.dogName}>{dog.name}</div>
              <div className={styles.physicalContent}>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Weight</p>
                  <p className={styles.physicalData}>{dog.weight}</p>
                </div>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Height</p>
                  <p className={styles.physicalData}>{dog.height}</p>
                </div>
                <div className={styles.physicalItem}>
                  <p className={styles.physicalTitle}>Life Span</p>
                  <p className={styles.physicalData}>{dog.life_span}</p>
                </div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Temperaments</div>
                <div className={styles.temperamentContent}>
                  {dog.temperament.map((t) => {
                    return <span key={t}>{t}</span>;
                  })}
                </div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Origin</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Bred For</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
              <div className={styles.otherContent}>
                <div className={styles.titleContent}>Breed Group</div>
                <div className={styles.dataContent}>NOT SPECIFIED</div>
              </div>
            </div>
            {dog.id.toString().includes("-") ? (
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  dispatch(deleteDog(dog.id));
                  history.goBack();
                }}
              >
                Delete Dog
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
