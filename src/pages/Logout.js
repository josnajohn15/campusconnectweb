import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("username"); // Remove any other user-related data
    navigate("/"); // Redirect to the Login page
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
