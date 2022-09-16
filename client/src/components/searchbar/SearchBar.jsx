import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { getDogsByName } from "../../store/actions";
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

  const setInitialState = () => {
    dispatch(setCurrentPage(1));
    dispatch(setMaxPageNumberLimit(5));
    dispatch(setMinPageNumberLimit(0));
  };
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
    </div>
  );
}

export default SearchBar;
