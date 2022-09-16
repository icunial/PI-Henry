import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../dogcard/DogCard";
import Message from "../message/Message";
import Loading from "../loading/Loading";
import Sidebar from "../sidebar/Sidebar";
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
  setCurrentPage,
  setMaxPageNumberLimit,
  setMinPageNumberLimit,
} from "../../store/actions";

function DogCards() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const loading = useSelector((state) => state.loading);
  const option = useSelector((state) => state.option);

  const currentPage = useSelector((state) => state.currentPage);
  const maxPageNumberLimit = useSelector((state) => state.maxPageNumberLimit);
  const minPageNumberLimit = useSelector((state) => state.minPageNumberLimit);
  /* 
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pageNumberLimit, setPageNumberLimit] = useState(5); */

  const itemsPerPage = 8;
  const pageNumberLimit = 5;

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

    if (currentPage + 1 > maxPageNumberLimit) {
      dispatch(setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit));
      dispatch(setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit));
    }
  };
  const handlePrevBtn = () => {
    dispatch(setCurrentPage(currentPage - 1));

    if ((currentPage - 1) % pageNumberLimit === 0) {
      dispatch(setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit));
      dispatch(setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit));
    }
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
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
    } else {
      return null;
    }
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
      default:
        dispatch(getDogsByName(option));
        break;
    }
  }, [dispatch]);

  return (
    <div className={styles.globalContainer}>
      {loading ? (
        <Loading />
      ) : typeof dogs === "string" ? (
        <Message text={dogs} />
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
