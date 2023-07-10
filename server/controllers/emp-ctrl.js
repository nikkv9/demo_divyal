import express from "express";
import { Emp } from "../models/emp-model.js";

const router = express.Router();

router.post("/emp/add", async (req, res) => {
  try {
    const { empName, email, mobile, dept, address, dob, doj, gender } =
      req.body;

    const emp = await Emp.create({
      empName,
      email,
      mobile,
      dept,
      address,
      dob,
      doj,
      gender,
    });
    res.status(200).send(emp);
  } catch (error) {
    console.log(error);
  }
});

export default router;
