import { useState, useEffect } from "react";
import "./AdminDetails.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AdminDetails = ({ handleActivate }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="modal">
      <div className="overlay" onClick={handleActivate}></div>
      <div className="modalContent">
        <div className="picContainer">
          <img src={user.photoURL || "https://via.placeholder.com/"} alt="" />
        </div>
        <p>Logged in as: {user.email}</p>
        <div>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={user.email} />
        </div>

        <div className="closeModal" onClick={handleActivate}>
          close
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
