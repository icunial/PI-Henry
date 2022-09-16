import React from "react";
import styles from "./Sidebar.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  changeOptionFilter,
  setCurrentPage,
  setMaxPageNumberLimit,
  setMinPageNumberLimit,
} from "../../store/actions";

import {
  getDogs,
  getDogsFromApi,
  getDogsFromDb,
  getDogsFromAtoZ,
  getDogsFromZtoA,
  getDogsMoreWeight,
  getDogsLessWeight,
} from "../../store/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.option);

  const setInitialState = () => {
    dispatch(setCurrentPage(1));
    dispatch(setMaxPageNumberLimit(5));
    dispatch(setMinPageNumberLimit(0));
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.itemsContainer}>
        <div
          className={option === "item_all" ? styles.itemSelected : styles.item}
          id="item_all"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogs());
            }
          }}
        >
          <div className={styles.itemTitle}>ALL</div>
          <div className={styles.itemDescription}>Get ALL</div>
        </div>
        <hr className={styles.hr} />
        <div
          className={option === "item_api" ? styles.itemSelected : styles.item}
          id="item_api"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsFromApi());
            }
          }}
        >
          <div className={styles.itemTitle}>API</div>
          <div className={styles.itemDescription}>From API</div>
        </div>
        <div
          className={option === "item_db" ? styles.itemSelected : styles.item}
          id="item_db"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsFromDb());
            }
          }}
        >
          <div className={styles.itemTitle}>DB</div>
          <div className={styles.itemDescription}>From DB</div>
        </div>
        <hr className={styles.hr} />
        <div
          className={option === "item_az" ? styles.itemSelected : styles.item}
          id="item_az"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsFromAtoZ());
            }
          }}
        >
          <div className={styles.itemTitle}>A-Z</div>
          <div className={styles.itemDescription}>From A to Z</div>
        </div>
        <div
          className={option === "item_za" ? styles.itemSelected : styles.item}
          id="item_za"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsFromZtoA());
            }
          }}
        >
          <div className={styles.itemTitle}>Z-A</div>
          <div className={styles.itemDescription}>From Z to A</div>
        </div>
        <hr className={styles.hr} />
        <div
          className={option === "item_more" ? styles.itemSelected : styles.item}
          id="item_more"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsMoreWeight());
            }
          }}
        >
          <div className={styles.itemTitle}>+</div>
          <div className={styles.itemDescription}>More Weight</div>
        </div>
        <div
          className={option === "item_less" ? styles.itemSelected : styles.item}
          id="item_less"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              setInitialState();
              dispatch(getDogsLessWeight());
            }
          }}
        >
          <div className={styles.itemTitle}>-</div>
          <div className={styles.itemDescription}>Less Weight</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
