import { Link } from "react-router-dom";
import "./Nav.css";

function Navbar ()  {
  return (
    <nav className="navbar">
      <div className="logo">
        <h3>
          MALLOYA <span id="group">GROUP</span>
        </h3>
      </div>
      <ul>
        <li>
          <Link to="/">Add Employee</Link>
        </li>
        <li>
          <Link to="/view-employees">View Employees</Link>
        </li>
        <li>
          <Link to="/view-deleted">Deleted Employees</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
