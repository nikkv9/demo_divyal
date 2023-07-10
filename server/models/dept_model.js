import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  deptType: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const Dept = mongoose.model("DEPT", deptSchema);
