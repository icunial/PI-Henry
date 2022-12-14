import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDogsByName,
  getDogsByTemperament,
} from "../../store/actions/dogsActions";

import {
  changeOptionFilter,
  setCurrentPage,
  changeValueFilter,
  getTemperaments,
} from "../../store/actions/actions";

import stylesLight from "./SearchBar.module.css";
import stylesDark from "./SearchBarDark.module.css";

const DropDown = (props) => {
  const [title, setTitle] = useState("Filter By Temperament");
  const theme = useSelector((state) => state.theme);

  let styles = theme ? stylesLight : stylesDark;

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownBtn} onClick={() => props.onClick()}>
        {title}
      </div>
      {props.isOpen && (
        <div className={styles.dropdownContent}>
          {props.temperaments.map((t) => {
            return (
              <div
                className={styles.dropdownItem}
                key={t.name}
                onClick={(e) => {
                  setTitle(t.name);
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
  const theme = useSelector((state) => state.theme);

  let styles = stylesLight;
  theme ? (styles = stylesLight) : (styles = stylesDark);

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
