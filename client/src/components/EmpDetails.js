import { Box, Modal } from "@mui/material";
import React from "react";
import stl from "./EmpDetails.module.css";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmpDetails = ({ openEmp, handleCloseEmp, employee }) => {
  return (
    <Modal
      open={openEmp}
      onClose={handleCloseEmp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={stl.box}>
        {employee && (
          <>
            <h3>Employee Details</h3>
            <div className={stl.empContainer}>
              <div className={stl.empData}>
                <p>Employee Name</p>
                <span>{employee.empName}</span>
              </div>
              <div className={stl.empData}>
                <p>Email</p>
                <span>{employee.email}</span>
              </div>
              <div className={stl.empData}>
                <p>Mobile</p>
                <span>{employee.mobile}</span>
              </div>
              <div className={stl.empData}>
                <p>Address</p>
                <span>{employee.address}</span>
              </div>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EmpDetails;
