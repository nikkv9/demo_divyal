import React, { useState, useEffect } from "react";
import stl from "./AddEmp.module.css";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuAsterisk } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const UpdateEmp = () => {
  const { id } = useParams();
  const [empName, setEmpName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(`/emp/${id}`);
        console.log(data);
        setEmpName(data.empName);
        setEmail(data.email);
        setMobile(data.mobile);
        setDept(data.dept);
        setAddress(data.address);
        setDob(new Date(data.dob));
        setDoj(new Date(data.doj));
        setGender(data.gender);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEmployee();
  }, [id]);

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

  const updateEmp = async (e) => {
    e.preventDefault();

    const errs = validateForm();

    if (Object.keys(errs).length > 0) {
      const firstErrorKey = Object.keys(errs)[0];
      toast.error(errs[firstErrorKey]);
      return;
    }

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
        return;
      }

      const { data } = await axios.put(`/emp/${id}`, {
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
        toast.success("Employee data has been updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={stl.container}>
      <Header />
      <form className={stl.form} onSubmit={updateEmp}>
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
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            wrapperClassName={stl.datePicker}
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose date"
            maxDate={new Date()}
          />
        </div>
        <div className={stl.fieldContainer}>
          <label className={stl.dateLabel}>
            DOJ
            <LuAsterisk color="crimson" />
          </label>
          <DatePicker
            selected={doj}
            onChange={(date) => setDoj(date)}
            wrapperClassName={stl.datePicker}
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose date"
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
        <div className={stl.btnContainer}>
          <button type="submit">Update Employee</button>
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

export default UpdateEmp;
