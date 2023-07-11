import express from "express";
import { Emp } from "../models/emp-model.js";
const router = express.Router();

router.post("/emp/add", async (req, res) => {
  try {
    const { empName, email, mobile, address, dob, doj, gender, deptId } =
      req.body;

    const emp = await Emp.create({
      empName,
      email,
      mobile,
      address,
      dob,
      doj,
      gender,
      deptId,
    });
    res.status(200).send(emp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/emp/all", async (req, res) => {
  try {
    const emp = await Emp.find().populate("deptId", "_id deptName deptType");

    res.send(emp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/emp/search", async (req, res) => {
  try {
    // get data with any one field
    // const { empName, email, mobile, address } = req.query;
    // const emps = await Emp.find({
    //   active: true,
    //   $or: [
    //     { empName: { $regex: String(empName), $options: "i" } },
    //     { email: { $regex: String(email), $options: "i" } },
    //     { mobile: { $regex: String(mobile), $options: "i" } },
    //     { address: { $regex: String(address), $options: "i" } },
    //   ],
    // });
    // res.json(emps);

    // get data with multiple fields
    const { empName, email, mobile, address } = req.query;

    const query = {
      active: true,
      ...(empName && { empName: { $regex: empName, $options: "i" } }),
      ...(email && { email: { $regex: email, $options: "i" } }),
      ...(mobile && { mobile: { $regex: mobile, $options: "i" } }),
      ...(address && { address: { $regex: address, $options: "i" } }),
    };
    const emps = await Emp.find(query);
    res.json(emps);
  } catch (error) {
    console.log(error);
  }
});

router.put("/emp/inactive/:id", async (req, res) => {
  try {
    await Emp.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      {
        new: true,
      }
    );
    res.status(200).send("Employee has been set as inactive!");
  } catch (error) {
    console.log(error);
  }
});
router.get("/emp/:id", async (req, res) => {
  try {
    const emp = await Emp.findById(req.params.id);
    res.status(200).send(emp);
  } catch (error) {
    console.log(error);
  }
});
router.put("/emp/:id", async (req, res) => {
  try {
    const emp = await Emp.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(emp);
  } catch (error) {
    console.log(error);
  }
});

// router.delete("/emp/:id", async (req, res) => {
//   try {
//     await Emp.findByIdAndDelete(req.params.id);
//     res.status(200).send("Employee data has deleted!");
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
