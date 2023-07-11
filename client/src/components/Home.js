import React from "react";
import stl from "./Home.module.css";
import Header from "./Header";
import Search from "./Search";

const Home = () => {
  return (
    <div className={stl.container}>
      <Header />
      <Search />
    </div>
  );
};

export default Home;
