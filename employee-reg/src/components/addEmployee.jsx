import React from "react";
import { useState, useEffect } from "react";
import "./addEmployee.css";



function AddEmployee({ addEmployee, nextEmpID }) {
  const [empInfo, setEmpInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    cellNumber: "",
    empID: "",
    position: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [empID, setEmpID] = useState(nextEmpID);

  useEffect(() => {
    setEmpID(nextEmpID);
  }, [nextEmpID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmpInfo({
      ...empInfo,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!empInfo.firstName || empInfo.firstName.length < 3 || empInfo.firstName.length > 20 || /\d/.test(empInfo.firstName)) {
      errors.firstName = "Name must be 3-20 letters and contain no numbers";
    }
    if (!empInfo.lastName || empInfo.lastName.length < 3 || empInfo.lastName.length > 20 || /\d/.test(empInfo.lastName)) {
      errors.lastName = "Surname must be 3-20 letters and contain no numbers";
    }
    if (!empInfo.gender) {
      errors.gender = "Gender is required";
    }
    if (!empInfo.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!empInfo.cellNumber || !/^\d{10}$/.test(empInfo.cellNumber)) {
      errors.cellNumber = "Cell number must be 10 digits";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formattedCellNumber = "+27" + empInfo.cellNumber.substring(1);
      const employeeWithID = { ...empInfo, empID, cellNumber: formattedCellNumber };
      addEmployee(employeeWithID);
      setEmpInfo({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        cellNumber: "",
        empID: "",
        position: "",
        image: "",
      });
    }
  };

  return (
    <main className="addEmpContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <p id="small">PLEASE ENTER EMPLOYEE INFORMATION TO BE CAPTURED</p>
          <p id="formHeading">PERSONAL INFORMATION</p>

          <div className="names">
            <div className="formGroup">
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={empInfo.firstName}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
              <span>Name</span>
            </div>
            <div className="formGroup">
              <input
                id="middleName"
                name="middleName"
                type="text"
                onChange={handleChange}
                value={empInfo.middleName}
              />
              <span>Middle Name</span>
            </div>
            <div className="formGroup">
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={empInfo.lastName}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              <span>Last Name</span>
            </div>
            <div className="formGroup">
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                value={empInfo.gender}
              >
                <option value="">Choose a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            <div className="formGroup">
              <input
                type="date"
                name="dob"
                id="dob"
                onChange={handleChange}
                value={empInfo.dob}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
              <span>Date of birth</span>
            </div>
          </div>

          <p id="formHeading">CONTACT INFORMATION</p>

          <div className="names">
            <div className="formGroup">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={empInfo.email}
              />
              <span>Email Address</span>
            </div>

            <div className="formGroup">
              <input
                id="cellNumber"
                name="cellNumber"
                type="text"
                onChange={handleChange}
                value={empInfo.cellNumber}
              />
              {errors.cellNumber && <span className="error">{errors.cellNumber}</span>}
              <span>Cell Number</span>
            </div>
          </div>

          <p id="formHeading">EMPLOYEE INFORMATION</p>

          <div className="names">
            <div className="formGroup">
              <input
                id="empID"
                name="empID"
                type="text"
                value={empID}
                readOnly
              />
              {/* <span>Employee ID</span> */}
            </div>
            <div className="formGroup">
              <input
                id="position"
                name="position"
                type="text"
                onChange={handleChange}
                value={empInfo.position}
              />
              <span>Position</span>
            </div>{" "}
            <div id="image">
              <label htmlFor="image">Profile Picture</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setEmpInfo({
                    ...empInfo,
                    image: event.target.files[0]
                  });
                }}
              />
            </div>
          </div>

          <button className="submitBtn" type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}

export default AddEmployee;
