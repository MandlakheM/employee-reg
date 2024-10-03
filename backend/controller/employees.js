import { v4 as uuid } from "uuid";

let employees = [];

export const getEmployees = (req, res) => {
  res.send(employees);
};

export const addEmployees = (req, res) => {
  const emp = req.body;

  employees.push({ ...emp, id: uuid() });
  res.send("employee added");
};

export const getEmployee = (req, res) => {
  const singleEmp = employees.filter(
    (employee) => employee.id === req.params.id
  );
  res.send(singleEmp);
};

export const deleteEmployee = (req, res) => {
  employees = employees.filter((employee) => employee.id !== req.params.id);
  res.send("employee deleted");
};

export const updateEmployee = (req, res) => {
  const employee = employees.find((employee) => employee.id === req.params.id);
  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.contact = req.body.contact;

  res.send("employee updated");
};
