import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  if (!user) {
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
