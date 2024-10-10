import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAdmins = ({ handleActivate }) => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admins");
      setAdmins(response.data);
      console.log(admins);
    } catch (error) {
      console.log("Error fetching admins:", error);
    }
  };

  const deleteAdmin = async (adminID) => {
    try {
      await axios.delete(`http://localhost:4000/admin/${adminID}`);
      alert("Admin deleted successfully");
      fetchAdmins();
    } catch (error) {
      console.error("Failed to delete admin:", error);
      alert("Failed to delete admin");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <div className="modal">
      <div className="overlay" onClick={handleActivate}></div>
      <div className="modalContent">
        <div className="tableContainer">
          <h1>Current Admins</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.empID}</td>
                    <td>{admin.firstName}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.dob}</td>
                    <td>admin</td>
                    <td>{admin.email}</td>
                    <td>
                      {admin.image ? (
                        <img
                          src={admin.image}
                          alt="profile"
                          width="50"
                          height="50"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => deleteAdmin(admin.adminID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmins;
