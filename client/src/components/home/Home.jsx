import React from "react";
import DogCards from "../dogscards/DogCards";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <SearchBar />
      <div className={styles.dogCardsContainer}>
        <DogCards />
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
