import React from "react";

import stylesLight from "./Sidebar.module.css";
import stylesDark from "./SidebarDark.module.css";

import {
  getDogs,
  getDogsFromApi,
  getDogsFromDb,
  getDogsFromAtoZ,
  getDogsFromZtoA,
  getDogsMoreWeight,
  getDogsLessWeight,
} from "../../store/actions/dogsActions";
import {
  changeTheme,
  changeOptionFilter,
  setCurrentPage,
} from "../../store/actions/actions";
import { connect } from "react-redux";

class SidebarClass extends React.Component {
  render() {
    let styles = this.props.theme ? stylesLight : stylesDark;
    return (
      <div
        className={
          this.props.theme
            ? styles.sidebarContainer
            : stylesDark.sidebarContainer
        }
      >
        <div
          className={
            this.props.theme ? styles.itemsContainer : stylesDark.itemsContainer
          }
        >
          <div
            className={
              this.props.option === "item_all"
                ? styles.itemSelected
                : styles.item
            }
            id="item_all"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogs();
              }
            }}
          >
            <div className={styles.itemTitle}>ALL</div>
            <div className={styles.itemDescription}>Get ALL</div>
          </div>
          <div
            className={
              this.props.option === "item_api"
                ? styles.itemSelected
                : styles.item
            }
            id="item_api"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsFromApi();
              }
            }}
          >
            <div className={styles.itemTitle}>API</div>
            <div className={styles.itemDescription}>From API</div>
          </div>
          <div
            className={
              this.props.option === "item_db"
                ? styles.itemSelected
                : styles.item
            }
            id="item_db"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsFromDb();
              }
            }}
          >
            <div className={styles.itemTitle}>DB</div>
            <div className={styles.itemDescription}>From DB</div>
          </div>

          <div
            className={
              this.props.option === "item_az"
                ? styles.itemSelected
                : styles.item
            }
            id="item_az"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsFromAtoZ();
              }
            }}
          >
            <div className={styles.itemTitle}>A-Z</div>
            <div className={styles.itemDescription}>From A to Z</div>
          </div>
          <div
            className={
              this.props.option === "item_za"
                ? styles.itemSelected
                : styles.item
            }
            id="item_za"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsFromZtoA();
              }
            }}
          >
            <div className={styles.itemTitle}>Z-A</div>
            <div className={styles.itemDescription}>From Z to A</div>
          </div>

          <div
            className={
              this.props.option === "item_more"
                ? styles.itemSelected
                : styles.item
            }
            id="item_more"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsMoreWeight();
              }
            }}
          >
            <div className={styles.itemTitle}>+</div>
            <div className={styles.itemDescription}>More Weight</div>
          </div>
          <div
            className={
              this.props.option === "item_less"
                ? styles.itemSelected
                : styles.item
            }
            id="item_less"
            onClick={(e) => {
              if (this.props.option !== e.currentTarget.id) {
                this.props.changeOptionFilter(e.currentTarget.id);
                this.props.setCurrentPage(1);
                this.props.getDogsLessWeight();
              }
            }}
          >
            <div className={styles.itemTitle}>-</div>
            <div className={styles.itemDescription}>Less Weight</div>
          </div>
          <button
            className={styles.changeThemeBtn}
            onClick={() => this.props.changeTheme(!this.props.theme)}
          >
            Change Theme
          </button>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: () => dispatch(getDogs()),
    getDogsFromApi: () => dispatch(getDogsFromApi()),
    getDogsFromDb: () => dispatch(getDogsFromDb()),
    getDogsFromAtoZ: () => dispatch(getDogsFromAtoZ()),
    getDogsFromZtoA: () => dispatch(getDogsFromZtoA()),
    getDogsMoreWeight: () => dispatch(getDogsMoreWeight()),
    getDogsLessWeight: () => dispatch(getDogsLessWeight()),
    changeTheme: (theme) => dispatch(changeTheme(theme)),
    changeOptionFilter: (option) => dispatch(changeOptionFilter(option)),
    setCurrentPage: (number) => dispatch(setCurrentPage(number)),
  };
};

export const mapStateToProps = (state) => {
  return {
    option: state.option,
    theme: state.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarClass);
