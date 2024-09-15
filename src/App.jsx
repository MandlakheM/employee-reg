import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ViewEmployees from "./components/ViewEmployees";
import AddEmployee from "./components/AddEmployee";
import ViewDeletedEmployees from "./components/ViewDeletedEmployees";
import Navbar from "./components/Navbar";

function App() {
  const [employees, setEmployees] = useState([]);
  const [nextEmpID, setEmpID] = useState(240700);
  const [removedEmp, setRemovedEmp] = useState([]);

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const addEmployee = async (employee) => {
    if (employee.image && employee.image instanceof File) {
      employee.image = await toBase64(employee.image);
    }
    setEmployees((employees) => [...employees, employee]);
    setEmpID((prevID) => prevID + 1);
    localStorage.setItem("employees", JSON.stringify([...employees, employee]));
    window.alert("Employee successfully added");
  };

  const deleteEmployee = (index) => {
    const confirm = window.confirm("Do you want to delete this employee");
    if (confirm) {
      const newEmployees = [...employees];
      setRemovedEmp(newEmployees.splice(index, 1));
      setEmployees(newEmployees);
      localStorage.setItem("employees", JSON.stringify(newEmployees));
    }
  };

  const editEmployee = (index, updatedEmployee) => {
    const newEmployees = [...employees];
    newEmployees[index] = updatedEmployee;
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

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
