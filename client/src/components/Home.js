import React from "react";
import stl from "./Home.module.css";
import Header from "./Header";
import EmpForm from "./EmpForm";

const Home = () => {
  return (
    <div className={stl.container}>
      <Header />
      <EmpForm />
    </div>
  );
};

export default Home;
