import React from "react";
import "./AdminDetails.css";

const AdminDetails = ({ handleActivate }) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={handleActivate}></div>
      <div className="modalContent">
        <p>name</p>
        <div className="closeModal" onClick={handleActivate}>
          close
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
