import React from "react";
import stl from "./EmpForm.module.css";
import { Link } from "react-router-dom";

const EmpForm = () => {
  return (
    <div className={stl.container}>
      <form className={stl.form}>
        <div className={stl.leftForm}>
          <div className={stl.fieldContainer}>
            <label>Employee Name</label>
            <input type="text" />
          </div>
          <div className={stl.fieldContainer}>
            <label>Email</label>
            <input type="text" />
          </div>
        </div>
        <div className={stl.rightForm}>
          <div className={stl.fieldContainer}>
            <label>Mobile</label>
            <input type="number" />
          </div>
          <div className={stl.fieldContainer}>
            <label>Department</label>
            <input type="text" />
          </div>
        </div>
      </form>
      <div className={stl.btnContainer}>
        <button>Search</button>
        <Link to="/emp/add" className={stl.addEmpLink}>
          <button>Add Emp</button>
        </Link>
        <button>Add Dept</button>
      </div>
    </div>
  );
};

export default EmpForm;
