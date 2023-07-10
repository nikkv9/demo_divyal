import express from "express";
const app = express();
const port = 5000;

import databaseConnection from "./db.js";
databaseConnection();

import empRoute from "./controllers/emp-ctrl.js";
import deptRoute from "./controllers/dept-ctrl.js";

app.use(express.json());

app.use(empRoute);
app.use(deptRoute);

app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});
