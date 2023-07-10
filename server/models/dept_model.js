import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
  dept_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const Emp = mongoose.model("DEPT", deptSchema);
