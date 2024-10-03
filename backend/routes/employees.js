import express from "express";

import {
  getEmployees,
  addEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controller/employees.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.post("/add-employee", addEmployees);
router.get("/employee/:id", getEmployee);
router.delete("/employee/:id", deleteEmployee);
router.put("/employee/:id", updateEmployee);

export default router;
