import React from "react";
import "./ViewEmployees.css"

function ViewDeletedEmployees({ removedEmp }) {
  return (
    <div className="tableContainer">
      <h1>Employees Who Have Left</h1>
      <div className="table">
      <table className="">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Email</th>
            <th>Cell Number</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {removedEmp.map((removedEmp, index) => (
            <tr key={index}>
              <td>{removedEmp.empID}</td>
              <td>{removedEmp.firstName}</td>
              <td>{removedEmp.middleName}</td>
              <td>{removedEmp.lastName}</td>
              <td>{removedEmp.dob}</td>
              <td>{removedEmp.gender}</td>
              <td>{removedEmp.position}</td>
              <td>{removedEmp.email}</td>
              <td>{removedEmp.cellNumber}</td>
              <td>
                {removedEmp.image ? (
                  <img
                    // src={URL.createObjectURL(removedEmp.image)}
                    alt="profile"
                    width="50"
                    height="50"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ViewDeletedEmployees;
