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

const DropDown = (props) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownBtn} onClick={() => props.onClick()}>
        Filter By Temperament
      </div>
      {props.isOpen && (
        <div className={styles.dropdownContent}>
          {props.temperaments.map((t) => {
            return (
              <div
                className={styles.dropdownItem}
                key={t.name}
                onClick={(e) => {
                  props.dispatch(setCurrentPage(1));
                  props.dispatch(changeOptionFilter("temperament"));
                  props.dispatch(changeValueFilter(t.name));
                  props.dispatch(getDogsByTemperament(t.name));
                  props.onClick();
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

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
        {
          <DropDown
            isOpen={isOpen}
            onClick={openDropDown}
            temperaments={temperaments}
            dispatch={dispatch}
          />
        }
      </div>
    </div>
  );
}

export default SearchBar;
