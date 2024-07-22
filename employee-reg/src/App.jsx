import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Aside from "./components/aside";
import AddEmployee from "./components/addEmployee";
import Update from "./components/update";
import Removed from "./components/removed";
import { Routes, Route } from "react-router-dom";

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
  };

  const deleteEmployee = (index) => {
    const newEmployees = [...employees];
    setRemovedEmp(newEmployees.splice(index, 1));
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  const editEmployee = (index, updatedEmployee) => {
    const newEmployees = [...employees];
    newEmployees[index] = updatedEmployee;
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  return (
    <>
      <div className="gutter">
        <div className="appContainer">
          <div className="header">
            <Header />
          </div>
          <div className="aside">
            <Aside />
          </div>
          <div className="main">
            <div className="mainContainer">
              <Routes>
                <Route
                  path="/components/addEmployee"
                  element={
                    <AddEmployee
                      addEmployee={addEmployee}
                      nextEmpID={nextEmpID}
                    />
                  }
                />
                <Route
                  path="/components/update"
                  element={
                    <Update
                      employees={employees}
                      deleteEmployee={deleteEmployee}
                      editEmployee={editEmployee}
                    />
                  }
                />
                <Route
                  path="/components/removed"
                  element={<Removed removedEmp={removedEmp} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
