import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  doj: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

export const Emp = mongoose.model("EMP", empSchema);
