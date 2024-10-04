import React, { useState } from "react";
import "./ViewEmployees.css";
import axios from "axios";

function ViewEmployees({ employees, deleteEmployee, editEmployee }) {
  const [modal, setModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [errors, setErrors] = useState({});

  const activateModal = () => {
    // setCurrentEmployee(employee);
    setModal(true);
    // console.log(currentEmployee);
  };

  const deactivateModal = () => {
    setModal(false);
    // setCurrentEmployee(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {};

  const validate = () => {
    let errors = {};
    if (
      !currentEmployee.firstName ||
      currentEmployee.firstName.length < 3 ||
      currentEmployee.firstName.length > 20 ||
      /\d/.test(currentEmployee.firstName)
    ) {
      errors.firstName = "Name must be 3-20 letters and contain no numbers";
    }
    if (
      !currentEmployee.lastName ||
      currentEmployee.lastName.length < 3 ||
      currentEmployee.lastName.length > 20 ||
      /\d/.test(currentEmployee.lastName)
    ) {
      errors.lastName = "Surname must be 3-20 letters and contain no numbers";
    }
    if (!currentEmployee.gender) {
      errors.gender = "Gender is required";
    }
    if (!currentEmployee.dob) {
      errors.dob = "Date of birth is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const formattedCellNumber =
        "+27" + currentEmployee.cellNumber.substring(1);
      const updatedEmployee = {
        ...currentEmployee,
        cellNumber: formattedCellNumber,
      };
      editEmployee(updatedEmployee);
      deactivateModal();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/employee/${searchID}`
      );
      setCurrentEmployee([response.data]);
      // alert("Employee found");
      // console.log([response.data]);
    } catch (error) {
      console.error("Failed to get employee:", error);
      alert("Employee not found");
    }
  };

  return (
    <div className="tableContainer">
      <h1>Current Employees</h1>
      <div className="searchContainer">
        <label htmlFor="searchID">Search Employee by ID:</label>
        <input
          type="text"
          name="searchID"
          id="searchID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />
      </div>
      <div className="searchButtons">
        <button className="submitBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="table">
        <table>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.empID}</td>
                <td>{employee.firstName}</td>
                <td>{employee.middleName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.dob}</td>
                <td>{employee.gender}</td>
                <td>{employee.position}</td>
                <td>{employee.email}</td>
                <td>{employee.cellNumber}</td>
                <td>
                  {employee.image ? (
                    <img
                      src={employee.image}
                      alt="profile"
                      width="50"
                      height="50"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                {/* <td>
                <MdDeleteForever
                  className="tableIcons"
                  onClick={() => deleteEmployee(index)}
                />
                <RiEdit2Fill
                  className="tableIcons"
                  onClick={() => activateModal(employee)}
                />
              </td> */}
                <td>
                  <button className="updateBtn" onClick={activateModal}>
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteEmployee(employee.empID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && currentEmployee && (
        <div className="modal">
          <div className="overlay" onClick={deactivateModal}></div>
          <div className="modalContent">
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={currentEmployee.firstName}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}

              <label htmlFor="middleName">Middle name</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                onChange={handleChange}
                value={currentEmployee.middleName}
              />

              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={currentEmployee.lastName}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}

              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                value={currentEmployee.gender}
              >
                <option value="">Choose a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}

              <label htmlFor="dob">Date of birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                onChange={handleChange}
                value={currentEmployee.dob}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={currentEmployee.email}
              />

              <label htmlFor="cellNumber">Cell number</label>
              <input
                id="cellNumber"
                name="cellNumber"
                type="text"
                onChange={handleChange}
                value={currentEmployee.cellNumber}
              />
              {errors.cellNumber && (
                <span className="error">{errors.cellNumber}</span>
              )}

              <label htmlFor="empID">Employee ID</label>
              <input
                id="empID"
                name="empID"
                type="text"
                value={currentEmployee.empID}
                readOnly
              />

              <label htmlFor="position">Position</label>
              <input
                id="position"
                name="position"
                type="text"
                onChange={handleChange}
                value={currentEmployee.position}
              />

              <label htmlFor="image">Profile Picture</label>
              <label htmlFor="image">Profile Picture</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
              />

              <button type="submit" className="submitBtn">
                Add Employee
              </button>
            </form>
            <button onClick={deactivateModal} className="closeModal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEmployees;
