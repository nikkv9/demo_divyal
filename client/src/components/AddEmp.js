import React, { useState } from "react";
import stl from "./AddEmp.module.css";
import Header from "./Header";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AddEmp = () => {
  const [empName, setEmpName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");
  const [deptId, setDeptId] = useState("");

  const validateForm = () => {
    const err = {};

    const nameRegex = /^[A-Za-z]+$/;
    if (!empName.match(nameRegex)) {
      err.empName = "Enter only alphabets in Employee Name field";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      err.email = "Please enter a valid email address";
    }

    if (mobile.length < 10 || mobile.length > 10) {
      err.mobile = "Mobile number must be 10 digits!";
    }

    return err;
  };

  const addEmp = async (e) => {
    e.preventDefault();

    const errs = validateForm();

    if (Object.keys(errs).length > 0) {
      const firstErrorKey = Object.keys(errs)[0];
      return toast.error(errs[firstErrorKey]);
    }

    try {
      if (
        !empName ||
        !email ||
        !mobile ||
        !address ||
        !dob ||
        !doj ||
        !gender ||
        !deptId
      ) {
        toast.error("Please fill all the fields!");
        return;
      }

      const { data } = await axios.post("/emp/add", {
        empName,
        email,
        mobile,
        address,
        dob,
        doj,
        gender,
        deptId,
      });

      console.log(data);
      if (data) {
        toast.success("Employee data has been created!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
            Deparment Id
            <LuAsterisk color="crimson" />
          </label>
          <input
            type="text"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label>
            DOB <LuAsterisk color="crimson" />
          </label>
          <div className={stl.dateContainer}>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              wrapperClassName={stl.datePicker}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose date"
              maxDate={new Date()}
            />
            <ArrowDropDownIcon className={stl.dropDown} />
          </div>
        </div>
        <div className={stl.fieldContainer}>
          <label className={stl.dateLabel}>
            DOJ
            <LuAsterisk color="crimson" />
          </label>
          <div className={stl.dateContainer}>
            <DatePicker
              selected={doj}
              onChange={(date) => setDoj(date)}
              wrapperClassName={stl.datePicker}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose date"
            />
            <ArrowDropDownIcon className={stl.dropDown} />
          </div>
        </div>

        <div
          className={stl.fieldContainerr}
          style={{ display: "flex", alignItems: "center" }}
        >
          <label style={{ display: "flex" }}>
            Gender
            <LuAsterisk color="crimson" />
          </label>

          <FormControl component="fieldset">
            <RadioGroup
              name="myRadioGroup"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  width: "40rem",
                }}
              >
                <FormControlLabel value="male" control={<Radio />} label="M" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="F"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </div>

        <div className={stl.btnContainer}>
          <button type="submit">Add Employee</button>
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

export default AddEmp;
