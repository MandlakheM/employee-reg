import { useState, useEffect } from "react";
import "./AdminDetails.css";
import AddAdmin from "./AddAdmin";

const AdminDetails = ({ handleActivate, isLoggedIn, uid, userInfo }) => {
  const [addAdmin, setAddAdmin] = useState(false);
  const [updating, setUpdating] = useState(false);

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user);
  //       } else {
  //         setUser({});
  //       }
  //     });
  //     return () => unsubscribe();
  //   }, [auth]);

  const handleAddAdmin = () => {
    setAddAdmin(!addAdmin);
    setUpdating(!updating);
  };

  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={handleActivate}></div>
        <div className="modalContent">
          <div className="picContainer">
            <img
              src={userInfo.image || "https://via.placeholder.com/"}
              alt=""
            />
          </div>
          <p>Logged in as: {userInfo.email}</p>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={userInfo.firstName}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={userInfo.lastName}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userInfo.email}
              readOnly
            />
          </div>
          <div className="closeModal" onClick={handleActivate}>
            close
          </div>
          <button onClick={handleAddAdmin}>update</button>
        </div>
      </div>
      {addAdmin && <AddAdmin userInfo={userInfo} updating={updating} />}
    </>
  );
};

export default AdminDetails;
