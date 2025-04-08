import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Register.css'; // Link to external CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      setMessage("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-heading">Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="input-field"
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link> {/* Use Link for navigation */}
        </p>
      </div>
    </div>
  );
};

export default Register;
