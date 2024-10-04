import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <Link to="/" onClick={toggleMenu}>Add Employee</Link>
        </li>
        <li>
          <Link to="/view-employees" onClick={toggleMenu}>View Employees</Link>
        </li>
        <li>
          <Link to="/view-deleted" onClick={toggleMenu}>Deleted Employees</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
