import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';  // Link to an external CSS file for styles

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(""); // For error/success messages
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  // Redirect to Home if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Home");
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setMessage("Please fill in both username and password.");
      return;
    }

    setLoading(true); // Set loading state while making the request
    try {
      const response = await axios.post("https://campus-connect-backend.onrender.com/login", formData);
      
      // Save token and username in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);

      setMessage("Login successful!");
      navigate("/Home"); // Navigate to Home on successful login
    } catch (err) {
      // Handle API errors
      setMessage(err.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  // Prevent rendering if already logged in
  if (localStorage.getItem("token")) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-heading">Login to Campus Connect</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field"
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="register-link">
                               
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
