import React from "react";
import DogCards from "../dogscards/DogCards";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import Sidebar from "../sidebar/Sidebar";
import SidebarClass from "../sidebar/SidebarClass";
import NavbarClass from "../navbar/NavbarClass";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      {/* <NavbarClass /> */}
      <SearchBar />
      <div className={styles.dogCardsContainer}>
        <DogCards />
      </div>
      <Sidebar />
      {/* <SidebarClass /> */}
    </div>
  );
}

export default Home;
