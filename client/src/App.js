import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddEmp from "./components/AddEmp";
import AddDept from "./components/AddDept";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emp/add" element={<AddEmp />} />
        <Route path="/dept/add" element={<AddDept />} />
      </Routes>
    </div>
  );
};

export default App;
