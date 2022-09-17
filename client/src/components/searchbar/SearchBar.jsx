import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDogsByName,
  getTemperaments,
  getDogsByTemperament,
  changeValueFilter,
} from "../../store/actions";

import { changeOptionFilter, setCurrentPage } from "../../store/actions";

import styles from "./SearchBar.module.css";

function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <form
          className={styles.searchbar}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(setCurrentPage(1));
            dispatch(changeOptionFilter("name"));
            dispatch(changeValueFilter(name));
            dispatch(getDogsByName(name));
            setName("");
          }}
        >
          <input
            className={styles.searchbar_field}
            type="text"
            placeholder="Search dog by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.searchbar_btn}
            type="submit"
            value="Search"
          />
        </form>
        <div>
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
                    dispatch(setCurrentPage(1));
                    dispatch(changeOptionFilter("temperament"));
                    dispatch(changeValueFilter(t.name));
                    dispatch(getDogsByTemperament(t.name));
                  }}
                >
                  {t.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
