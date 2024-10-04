import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        alert("Error signing out: ", error);
      });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h3>
          MALLOYA <span id="group">GROUP</span>
        </h3>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/add-employees" onClick={toggleMenu}>
            Add Employee
          </Link>
        </li>
        <li>
          <Link to="/view-employees" onClick={toggleMenu}>
            View Employees
          </Link>
        </li>
        <li>
          <Link to="/view-deleted" onClick={toggleMenu}>
            Deleted Employees
          </Link>
        </li>
      </ul>

      {isLoggedIn && (
        <button onClick={handleSignOut} className="signOutBtn">
          Sign out
        </button>
      )}
    </nav>
  );
}

export default Navbar;
