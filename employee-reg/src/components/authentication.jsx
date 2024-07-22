import React from "react";
import "./authentication.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Authentication() {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (username === "admin" && password === "admin123") {
      navigate("/components/addEmployee");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container sign-up"></div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h2>login</h2>
          <div className="form-group">
            <input name="username" id="username" type="text" required />
            <i className="fas fa-user"></i>
            <label>username</label>
          </div>
          <div className="form-group">
            <input name="password" id="password" type="password" required />
            <i className="fas fa-lock"></i>
            <label>password</label>
          </div>
          <div className="forgot-pass">
            <a href="#">forgot password?</a>
          </div>
          <button type="submit" className="btn">
            login
          </button>
          <div className="link">
            <p>
              Don't have an account?
              <a href="#" className="signup-link">
                {" "}
                sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
