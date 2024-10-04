import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ViewEmployees from "./components/ViewEmployees";
import AddEmployee from "./components/AddEmployee";
import ViewDeletedEmployees from "./components/ViewDeletedEmployees";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [nextEmpID, setEmpID] = useState(240700);
  const [removedEmp, setRemovedEmp] = useState([]);

  useEffect(() => {
    // const storedEmployees = localStorage.getItem("employees");
    // if (storedEmployees) {
    //   setEmployees(JSON.parse(storedEmployees));
    // }
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log(object)("Error fetching recipes:", error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      await axios.post("http://localhost:4000/add-employee", employee);
      alert("employee added");
    } catch (error) {
      console.log("failed to add employee: ", error);
    }
  };

  const deleteEmployee = async (employeID) => {
    try {
      await axios.delete(`http://localhost:4000/employee/${employeID}`);
      alert("employee deleted");
    } catch (error) {
      console.log("failed to delete employee: ", error);
    }
  };

  const editEmployee = (index, updatedEmployee) => {};

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AddEmployee addEmployee={addEmployee} nextEmpID={nextEmpID} />
          }
        />
        <Route
          path="/view-employees"
          element={
            <ViewEmployees
              employees={employees}
              deleteEmployee={deleteEmployee}
              editEmployee={editEmployee}
            />
          }
        />
        <Route
          path="/view-deleted"
          element={<ViewDeletedEmployees removedEmp={removedEmp} />}
        />
      </Routes>
    </>
  );
}

export default App;
