import React, { useState, useEffect } from "react";
import "./AddEmployee.css";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);

  useEffect(() => {
    setEmpID(nextEmpID);
  }, [nextEmpID]);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      // console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setEmpInfo((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmpInfo({
      ...empInfo,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (
      !empInfo.firstName ||
      empInfo.firstName.length < 3 ||
      empInfo.firstName.length > 20 ||
      /\d/.test(empInfo.firstName)
    ) {
      errors.firstName = "Name must be 3-20 letters and contain no numbers";
    }
    if (
      !empInfo.lastName ||
      empInfo.lastName.length < 3 ||
      empInfo.lastName.length > 20 ||
      /\d/.test(empInfo.lastName)
    ) {
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
      const employeeWithID = {
        ...empInfo,
        empID,
        cellNumber: formattedCellNumber,
      };
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
    <div className="formContainer">
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={empInfo.firstName}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label htmlFor="middleName">Middle name</label>
        <input
          id="middleName"
          name="middleName"
          type="text"
          onChange={handleChange}
          value={empInfo.middleName}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={empInfo.lastName}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

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

        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          name="dob"
          id="dob"
          onChange={handleChange}
          value={empInfo.dob}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={empInfo.email}
        />

        <label htmlFor="cellNumber">Cell number</label>
        <input
          id="cellNumber"
          name="cellNumber"
          type="text"
          onChange={handleChange}
          value={empInfo.cellNumber}
        />
        {errors.cellNumber && (
          <span className="error">{errors.cellNumber}</span>
        )}

        <label htmlFor="empID">Employee ID</label>
        <input id="empID" name="empID" type="text" value={empID} readOnly />

        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          type="text"
          onChange={handleChange}
          value={empInfo.position}
        />

        <label htmlFor="image">Profile Picture</label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="submitBtn">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
