import React from "react";
import stylesLight from "./Sidebar.module.css";
import stylesDark from "./SidebarDark.module.css";

import { useDispatch, useSelector } from "react-redux";

import { changeOptionFilter, setCurrentPage } from "../../store/actions";

import {
  getDogs,
  getDogsFromApi,
  getDogsFromDb,
  getDogsFromAtoZ,
  getDogsFromZtoA,
  getDogsMoreWeight,
  getDogsLessWeight,
  changeTheme,
} from "../../store/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.option);
  const theme = useSelector((state) => state.theme);

  let styles = stylesLight;

  theme ? (styles = stylesLight) : (styles = stylesDark);

  return (
    <div
      className={theme ? styles.sidebarContainer : stylesDark.sidebarContainer}
    >
      <div
        className={theme ? styles.itemsContainer : stylesDark.itemsContainer}
      >
        <div
          className={option === "item_all" ? styles.itemSelected : styles.item}
          id="item_all"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              dispatch(setCurrentPage(1));
              dispatch(getDogs());
            }
          }}
        >
          <div className={styles.itemTitle}>ALL</div>
          <div className={styles.itemDescription}>Get ALL</div>
        </div>
        <div
          className={option === "item_api" ? styles.itemSelected : styles.item}
          id="item_api"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              dispatch(setCurrentPage(1));
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
              dispatch(setCurrentPage(1));
              dispatch(getDogsFromDb());
            }
          }}
        >
          <div className={styles.itemTitle}>DB</div>
          <div className={styles.itemDescription}>From DB</div>
        </div>

        <div
          className={option === "item_az" ? styles.itemSelected : styles.item}
          id="item_az"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              dispatch(setCurrentPage(1));
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
              dispatch(setCurrentPage(1));
              dispatch(getDogsFromZtoA());
            }
          }}
        >
          <div className={styles.itemTitle}>Z-A</div>
          <div className={styles.itemDescription}>From Z to A</div>
        </div>

        <div
          className={option === "item_more" ? styles.itemSelected : styles.item}
          id="item_more"
          onClick={(e) => {
            if (option !== e.currentTarget.id) {
              dispatch(changeOptionFilter(e.currentTarget.id));
              dispatch(setCurrentPage(1));
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
              dispatch(setCurrentPage(1));
              dispatch(getDogsLessWeight());
            }
          }}
        >
          <div className={styles.itemTitle}>-</div>
          <div className={styles.itemDescription}>Less Weight</div>
        </div>
        <button
          className={styles.changeThemeBtn}
          onClick={() => dispatch(changeTheme(!theme))}
        >
          Change Theme
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
