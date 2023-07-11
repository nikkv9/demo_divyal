import React from "react";
import stl from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  let midText;

  if (location.pathname === "/") {
    midText = "Search Employee";
  }
  if (location.pathname === "/emp/add") {
    midText = "Add Employee";
  }
  if (location.pathname === "/emp/update") {
    midText = "Update Employee";
  }
  if (location.pathname === "/dept/add") {
    midText = "Add Department";
  }
  if (location.pathname.includes("/emp/update")) {
    midText = "Update Employee";
  }
  if (location.pathname.includes("/dept/update")) {
    midText = "Update Department";
  }
  return (
    <div className={stl.container}>
      <div className={stl.left}>
        <Link to="/">LOGO</Link>
      </div>
      <div className={stl.mid}>{midText}</div>
      <div className={stl.right}></div>
    </div>
  );
};

export default Header;
