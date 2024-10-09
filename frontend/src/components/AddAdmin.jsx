import React from "react";
import "./AdminDetails.css";

const AddAdmin = ({ handleAddAdmin, userInfo, updating }) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={handleAddAdmin}></div>
      <div className="modalContent">
        <h2>{updating ? "update your profile" : "add new admin"}</h2>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={updating ? userInfo.firstName : ""}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={updating ? userInfo.lastName : ""}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={updating ? userInfo.email : ""}
        />
        <label htmlFor="id">ID</label>
        <input
          id="id"
          name="id"
          type="text"
          value={updating ? userInfo.adminID : ""}
        />
        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={updating ? userInfo.dob : ""}
        />
        <input type="file" name="" id="" />
        <button>{updating ? "update details" : "create new admin"}</button>
        <div className="closeModal" onClick={handleAddAdmin}>
          close
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
