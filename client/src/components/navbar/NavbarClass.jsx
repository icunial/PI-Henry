import React from "react";
import { Link, withRouter } from "react-router-dom";

import stylesLight from "./Navbar.module.css";
import stylesDark from "./NavbarDark.module.css";

import { connect } from "react-redux";

class NavbarClass extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = this.props.theme ? stylesLight : stylesDark;
    const { pathname } = this.props.location;
    return (
      <div className={styles.globalContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>HenryDOGS!</h1>
          <div className={styles.links}>
            {pathname !== "/home" && (
              <Link to="/home" className={styles.link}>
                Home
              </Link>
            )}
            {pathname !== "/form" && (
              <Link to="/form" className={styles.link}>
                Create New Dog
              </Link>
            )}
            {pathname !== "/favourites" && (
              <Link to="/favourites" className={styles.link}>
                My Favourites
              </Link>
            )}
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

export default connect(mapStateToProps, null)(withRouter(NavbarClass));
