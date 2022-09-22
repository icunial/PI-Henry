import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../dogcard/DogCard";
import Loading from "../loading/Loading";
import Message from "../message/Message";
import styles from "./DogCards.module.css";
import {
  getDogs,
  getDogsFromApi,
  getDogsFromDb,
  getDogsFromAtoZ,
  getDogsFromZtoA,
  getDogsLessWeight,
  getDogsMoreWeight,
  getDogsByName,
  getDogsByTemperament,
} from "../../store/actions/dogsActions";
import { setCurrentPage } from "../../store/actions/actions";

function DogCards() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const loading = useSelector((state) => state.loading);
  const option = useSelector((state) => state.option);
  const valueFilter = useSelector((state) => state.valueFilter);

  const currentPage = useSelector((state) => state.currentPage);

  const itemsPerPage = 8;

  const pages = [];
  for (let i = 1; i <= Math.ceil(dogs.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dogs.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (e) => {
    dispatch(setCurrentPage(Number(e.target.id)));
  };

  const handleNextBtn = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  const handlePrevBtn = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const renderPageNumbers = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? styles.active : null}
      >
        {number}
      </li>
    );
  });

  useEffect(() => {
    switch (option) {
      case "item_all":
        dispatch(getDogs());
        break;
      case "item_api":
        dispatch(getDogsFromApi());
        break;
      case "item_db":
        dispatch(getDogsFromDb());
        break;
      case "item_az":
        dispatch(getDogsFromAtoZ());
        break;
      case "item_za":
        dispatch(getDogsFromZtoA());
        break;
      case "item_more":
        dispatch(getDogsMoreWeight());
        break;
      case "item_less":
        dispatch(getDogsLessWeight());
        break;
      case "name":
        dispatch(getDogsByName(valueFilter));
        break;
      case "temperament":
        dispatch(getDogsByTemperament(valueFilter));
    }
  }, [dispatch]);

  return (
    <div className={styles.globalContainer}>
      {loading ? (
        <Loading />
      ) : typeof dogs === "string" ? (
        <Message message={dogs} />
      ) : (
        <div className={styles.container}>
          <ul className={styles.paginationNumbers}>
            {currentPage !== 1 ? <li onClick={handlePrevBtn}>Prev</li> : null}
            {renderPageNumbers}
            {currentPage !== pages.length && renderPageNumbers ? (
              <li onClick={handleNextBtn}>Next</li>
            ) : null}
          </ul>
          <div className={styles.dogContainer}>
            {currentItems.map((dog) => (
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
      )}
    </div>
  );
}

export default DogCards;
