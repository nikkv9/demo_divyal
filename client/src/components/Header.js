import React from "react";
import stl from "./Header.module.css";

const Header = () => {
  return (
    <div className={stl.container}>
      <div className={stl.left}>LOGO</div>
      <div className={stl.mid}>Employee Search</div>
      <div className={stl.right}></div>
    </div>
  );
};

export default Header;
