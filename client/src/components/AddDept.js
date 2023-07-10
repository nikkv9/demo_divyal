import React, { useState } from "react";
import stl from "./AddDept.module.css";
import Header from "./Header";
import { LuAsterisk } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";

const AddDept = () => {
  const [deptName, setDeptName] = useState("");
  const [deptType, setDeptType] = useState("");
  const [address, setAddress] = useState("");

  const addDept = async (e) => {
    e.preventDefault();

    try {
      if (!deptName || !deptType || !address) {
        toast.error("Please fill all the fields!");
        return;
      }
      const { data } = await axios.post("/dept/add", {
        deptName,
        deptType,
        address,
      });
      console.log(data);
      if (data) {
        toast.success("Department data has been created!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={stl.container}>
      <Header />
      <form className={stl.form} onSubmit={addDept}>
        <div className={stl.fieldContainer}>
          <label>
            Department Name
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
          />
        </div>

        <div className={stl.fieldContainer}>
          <label>
            Department Type
            <LuAsterisk color="crimson" />
          </label>
          <Select
            value={deptType}
            onChange={(e) => setDeptType(e.target.value)}
            displayEmpty
            className={stl.select}
          >
            <MenuItem value="Customer Support">Customer Support</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
          </Select>
        </div>

        <div className={stl.fieldContainer}>
          <label>
            Address
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={stl.btnContainer}>
          <button type="submit">Add Department</button>
        </div>
      </form>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default AddDept;
