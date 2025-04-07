import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!auth.currentUser) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return children;
};

export default ProtectedRoute;