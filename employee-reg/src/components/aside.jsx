import React from "react";
import "./aside.css";
import { Link, Route, Routes } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

function aside() {
  return (
    <>
      <aside className="asideContainer">
        <div className="buttonContainer">
          <ul>
            <li>
              <Link id="addEmp" to="/components/addEmployee">
                Add Employee
                <FaAddressBook className="asideIcons" />
              </Link>
            </li>
            <li>
              <Link id="viewEmp" to="/components/update">
                View Employee
                <FaUsersViewfinder className="asideIcons" />
              </Link>
            </li>
            <li>
              <Link id="removedEmp" to="/components/removed">
                Removed Employee <MdDeleteForever className="asideIcons" />
              </Link>
            </li>
            {/* <Link id="viewEmp" to="/components/authentication">SignOut</Link> */}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default aside;
