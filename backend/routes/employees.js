import express from "express";

import {
  getEmployees,
  addEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getDeletedEmployees,
  addAdmin,
  getAdmin,
} from "../controller/employees.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.post("/add-employee", addEmployees);
router.get("/employee/:id", getEmployee);
router.delete("/employee/:id", deleteEmployee);
router.put("/employee/:id", updateEmployee);
router.get("/deleted-employees", getDeletedEmployees);

router.post("/add-admin", addAdmin);
router.get("/admin/:id", getAdmin);

export default router;
