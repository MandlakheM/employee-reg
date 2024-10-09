import React from "react";
import "./AdminDetails.css";

const AddAdmin = ({ handleAddAdmin }) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={handleAddAdmin}></div>
      <div className="modalContent">
        <h2>add new admin</h2>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" type="text" />
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" type="text" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="id">ID</label>
        <input id="id" name="id" type="text" />
        <label htmlFor="dob">Date of birth</label>
        <input type="date" name="dob" id="dob" />
        <input type="file" name="" id="" />
        <button>create admin</button>
        <div className="closeModal" onClick={handleAddAdmin}>
          close
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
