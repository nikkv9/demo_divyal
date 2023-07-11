import React, { useEffect, useState } from "react";
import stl from "./Search.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Modal } from "@mui/material";
import EmpDetails from "./EmpDetails";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = () => {
  const [empName, setEmpName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);

  const [open, setOpen] = useState(false);
  const [inactiveEmployeeId, setInactiveEmployeeId] = useState("");
  const [openEmp, setOpenEmp] = React.useState(false);

  const [empData, setEmpData] = useState(null);

  const handleOpen = (id) => {
    setInactiveEmployeeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInactiveEmployeeId("");
  };

  const handleOpenEmp = (emp) => {
    setOpenEmp(true);
    setEmpData(emp);
  };
  const handleCloseEmp = () => setOpenEmp(false);

  const searchEmp = async (e) => {
    e.preventDefault();

    if (!empName && !mobile && !email && !address) {
      return toast.error("Please fill in at least one field");
    }

    try {
      const queryParams = new URLSearchParams();
      if (empName) queryParams.append("empName", empName);
      if (email) queryParams.append("email", email);
      if (mobile) queryParams.append("mobile", mobile);
      if (address) queryParams.append("address", address);

      const { data } = await axios.get(`/emp/search?${queryParams.toString()}`);
      console.log(data);
      setResults(data);
    } catch (error) {
      toast.error(error.message);
    }
    // finally {
    //   setEmpName("");
    //   setEmail("");
    //   setMobile("");
    //   setAddress("");
    // }
  };

  const handleInactive = async () => {
    try {
      await axios.put(`/emp/inactive/${inactiveEmployeeId}`);
      toast.success("Employee has been set as inactive!");
      setResults(
        results.filter((item) => item._id !== inactiveEmployeeId && item.active)
      );
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "empName",
      headerName: "Employee Name",
      flex: 0.5,
      headerClassName: stl.gridColumnHeader,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      headerClassName: stl.gridColumnHeader,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 0.5,
      headerClassName: stl.gridColumnHeader,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
      headerClassName: stl.gridColumnHeader,
    },
    {
      field: "actions",
      flex: 0.3,
      headerClassName: stl.gridColumnHeader,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className={stl.action}>
              <VisibilityIcon
                style={{ color: "teal", cursor: "pointer" }}
                onClick={() => handleOpenEmp(params.row)}
              />

              <Link to={`/emp/update/${params.row.id}`}>
                <EditIcon style={{ color: "green", margin: "0 2rem" }} />
              </Link>

              <DeleteIcon
                style={{ color: "crimson", cursor: "pointer" }}
                onClick={() => handleOpen(params.row.id)}
              />
            </div>
          </>
        );
      },
    },
  ];

  const rows = results.map((item) => ({
    id: item._id,
    empName: item.empName,
    email: item.email,
    mobile: item.mobile,
    address: item.address,
  }));

  return (
    <>
      <div className={stl.container}>
        <form className={stl.form}>
          <div className={stl.leftForm}>
            <div className={stl.fieldContainer}>
              <label>Employee Name</label>
              <input
                type="text"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
            </div>
            <div className={stl.fieldContainer}>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={stl.rightForm}>
            <div className={stl.fieldContainer}>
              <label>Mobile</label>
              <input
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className={stl.fieldContainer}>
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className={stl.btnContainer}>
          <button onClick={searchEmp}>Search</button>
          <Link to="/emp/add" className={stl.addEmpLink}>
            <button>Add Emp</button>
          </Link>

          <Link to="/dept/add" className={stl.addDeptLink}>
            <button>Add Dept</button>
          </Link>
        </div>
      </div>

      <div className={stl.tableContainer}>
        <h3>Search Results</h3>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          className={stl.listTable}
          autoHeight
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ textAlign: "center" }}>Are you sure?</h3>
          <div className={stl.modalBtns}>
            <button onClick={handleClose}>No</button>
            <button onClick={handleInactive}>Yes</button>
          </div>
        </Box>
      </Modal>

      <EmpDetails
        openEmp={openEmp}
        handleCloseEmp={handleCloseEmp}
        employee={empData}
      />

      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </>
  );
};

export default Search;
