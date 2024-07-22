import React, { useState } from 'react';
import "./update.css"
import { MdDeleteForever } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';

function Update({ employees, deleteEmployee, editEmployee }) {
  const [modal, setModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchID, setSearchID] = useState("");
  const [errors, setErrors] = useState({});

  const activateModal = (employee) => {
    setCurrentEmployee(employee);
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
    setCurrentEmployee(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setCurrentEmployee({
      ...currentEmployee,
      image: event.target.files[0],
    });
  };

  const validate = () => {
    let errors = {};
    if (!currentEmployee.firstName || currentEmployee.firstName.length < 3 || currentEmployee.firstName.length > 20 || /\d/.test(currentEmployee.firstName)) {
      errors.firstName = "Name must be 3-20 letters and contain no numbers";
    }
    if (!currentEmployee.lastName || currentEmployee.lastName.length < 3 || currentEmployee.lastName.length > 20 || /\d/.test(currentEmployee.lastName)) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formattedCellNumber = "+27" + currentEmployee.cellNumber.substring(1);
      const updatedEmployee = { ...currentEmployee, cellNumber: formattedCellNumber };
      const index = employees.findIndex(emp => emp.empID === updatedEmployee.empID);
      if (index !== -1) {
        editEmployee(index, updatedEmployee);
      }
      deactivateModal();
    }
  };

  const handleSearch = () => {
    const employee = employees.find(emp => emp.empID === parseInt(searchID, 10));
    if (employee) {
      setCurrentEmployee(employee);
      setModal(true);
    } else {
      alert('Employee not found');
    }
  };

  return (
    <main>
      <div className="updateContainer">
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
          <button id="search" onClick={handleSearch}>Search</button>
        </div>
        <div className="viewTable">
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
                  <td>
                    <MdDeleteForever className='tableIcons' onClick={() => deleteEmployee(index)} />
                    <RiEdit2Fill className='tableIcons' onClick={() => activateModal(employee)} />
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
                <p id="small">PLEASE ENTER EMPLOYEE INFORMATION TO BE CAPTURED</p>
                <p id="formHeading">PERSONAL INFORMATION</p>

                <div className="names">
                  <div className="formGroup">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      value={currentEmployee.firstName}
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
                      value={currentEmployee.middleName}
                    />
                    <span>Middle Name</span>
                  </div>
                  <div className="formGroup">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      value={currentEmployee.lastName}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                    <span>Last Name</span>
                  </div>
                  <div className="formGroup">
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
                  </div>
                  <div className="formGroup">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      onChange={handleChange}
                      value={currentEmployee.dob}
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
                      value={currentEmployee.email}
                    />
                    <span>Email Address</span>
                  </div>

                  <div className="formGroup">
                    <input
                      id="cellNumber"
                      name="cellNumber"
                      type="text"
                      onChange={handleChange}
                      value={currentEmployee.cellNumber}
                    />
                    {errors.cellNumber && <span className="error">{errors.cellNumber}</span>}
                    <span>Cell Number</span>
                  </div>
                </div>

                <p id="formHeading">EMPLOYEE INFORMATION</p>

                <div className="names">
                  <div className="formGroup">
                    <label htmlFor="empID"></label>
                    <input
                      id="empID"
                      name="empID"
                      type="text"
                      value={currentEmployee.empID}
                      readOnly
                    />
                  </div>
                  <div className="formGroup">
                    <input
                      id="position"
                      name="position"
                      type="text"
                      onChange={handleChange}
                      value={currentEmployee.position}
                    />
                    <span>Position</span>
                  </div>
                  <div id="image">
                    <label htmlFor="image">Profile Picture</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <button className='submitBtn' type="submit">Submit</button>
              </form>
              <button onClick={deactivateModal} className="closeModal">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Update;