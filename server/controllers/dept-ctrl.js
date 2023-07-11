import express from "express";
import { Dept } from "../models/dept_model.js";

const router = express.Router();

router.post("/dept/add", async (req, res) => {
  try {
    const { deptName, deptType, address } = req.body;

    const dept = await Dept.create({
      deptName,
      deptType,
      address,
    });
    res.status(200).send(dept);
  } catch (error) {
    console.log(error);
  }
});

router.get("/dept/:id", async (req, res) => {
  try {
    const dept = await Dept.findById(req.params.id);
    res.status(200).send(dept);
  } catch (error) {
    console.log(error);
  }
});

router.put("/dept/:id", async (req, res) => {
  try {
    const dept = await Dept.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(dept);
  } catch (error) {
    console.log(error);
  }
});

export default router;
