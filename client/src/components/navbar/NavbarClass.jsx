import React from "react";
import { Link } from "react-router-dom";

import stylesLight from "./Navbar.module.css";
import stylesDark from "./NavbarDark.module.css";

import { connect } from "react-redux";

class NavbarClass extends React.Component {
  render() {
    const styles = this.props.theme ? stylesLight : stylesDark;
    return (
      <div className={styles.globalContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>HenryDOGS!</h1>
          <div className={styles.links}>
            <Link to="/home" className={styles.link}>
              Home
            </Link>
            <Link to="/form" className={styles.link}>
              Create New Dog
            </Link>
            <Link to="/favourites" className={styles.link}>
              My Favourites
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, null)(NavbarClass);
