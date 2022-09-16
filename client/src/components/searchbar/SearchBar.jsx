import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDogsByName,
  getTemperaments,
  getDogsByTemperament,
} from "../../store/actions";
import {
  changeOptionFilter,
  setCurrentPage,
  setMaxPageNumberLimit,
  setMinPageNumberLimit,
} from "../../store/actions";

import styles from "./SearchBar.module.css";

function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  const setInitialState = () => {
    dispatch(setCurrentPage(1));
    dispatch(setMaxPageNumberLimit(5));
    dispatch(setMinPageNumberLimit(0));
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <form
        className={styles.searchbar}
        onSubmit={(e) => {
          e.preventDefault();
          setName("");
          setInitialState();
          dispatch(changeOptionFilter(""));
          dispatch(getDogsByName(name));
        }}
      >
        <input
          className={styles.searchbar_field}
          type="text"
          placeholder="Search dog by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className={styles.searchbar_btn} type="submit" value="Search" />
      </form>
      <select className={styles.select} name="temperamentsFromApi">
        <option selected disabled>
          Select at least one temperament
        </option>
        {temperaments.map((t) => {
          return (
            <option
              key={t.name}
              value={t.name}
              onClick={(e) => {
                setInitialState();
                dispatch(changeOptionFilter(""));
                dispatch(getDogsByTemperament(t.name));
              }}
            >
              {t.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SearchBar;
