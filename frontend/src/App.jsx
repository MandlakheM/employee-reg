import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ViewEmployees from "./components/ViewEmployees";
import AddEmployee from "./components/AddEmployee";
import ViewDeletedEmployees from "./components/ViewDeletedEmployees";
import Navbar from "./components/Navbar";
import axios from "axios";
import SignIn from "./components/signIn";
import ProtectedRoute from "./ProtectedRoute";

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
    fetchDeletedEmp();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const fetchDeletedEmp = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/deleted-employees"
      );
      setRemovedEmp(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      await axios.post("http://localhost:4000/add-employee", employee);
      alert("employee added");
      fetchEmployees()
      setEmpID((prevID) => prevID + 1);
    } catch (error) {
      console.log("failed to add employee: ", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:4000/employee/${employeeId}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
      alert("Failed to delete employee");
    }
  };

  const editEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/employee/${updatedEmployee.empID}`,
        updatedEmployee
      );
      alert("Employee updated successfully");
      fetchEmployees();
      return response.data;
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert("Failed to update employee");
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/add-employees"
          element={
            <ProtectedRoute>
              <AddEmployee addEmployee={addEmployee} nextEmpID={nextEmpID} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-employees"
          element={
            <ProtectedRoute>
              <ViewEmployees
                employees={employees}
                deleteEmployee={deleteEmployee}
                editEmployee={editEmployee}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-deleted"
          element={
            <ProtectedRoute>
              <ViewDeletedEmployees removedEmp={removedEmp} />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
