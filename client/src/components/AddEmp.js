import React, { useState } from "react";
import stl from "./AddEmp.module.css";
import Header from "./Header";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddEmp = () => {
  const [empName, setEmpName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");

  const addEmp = async (e) => {
    e.preventDefault();

    try {
      if (
        !empName ||
        !email ||
        !mobile ||
        !dept ||
        !address ||
        !dob ||
        !doj ||
        !gender
      ) {
        toast.error("Please fill all the fields!");
      }

      const { data } = await axios.post("/emp/add", {
        empName,
        email,
        mobile,
        dept,
        address,
        dob,
        doj,
        gender,
      });
      console.log(data);
      if (data) {
        toast.success("Employee data has been created!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={stl.container}>
      <Header />
      <form className={stl.form} onSubmit={addEmp}>
        <div className={stl.fieldContainer}>
          <label>
            Employee Name
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label>
            Email
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label>
            Mobile
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label>
            Department
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
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
        <div className={stl.fieldContainer}>
          <label>
            DOB <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label>
            DOJ
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={doj}
            onChange={(e) => setDoj(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainerr}>
          <label>
            Gender
            <LuAsterisk color="crimson" />
          </label>
          <div className={stl.radioInput}>
            <FormControl component="fieldset">
              <RadioGroup
                name="myRadioGroup"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio />} label="M" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="F"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <button type="submit">Add Employee</button>
      </form>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default AddEmp;
