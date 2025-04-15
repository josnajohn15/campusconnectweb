import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./registerEvent.css"; // Make sure to update the CSS file

const RegisterPage = () => {
    const { eventId } = useParams(); // Get event ID from URL
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        semester: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://campus-connect-backend.onrender.com/api/register", { ...formData, eventId });
            alert("✅ Registration successful! Confirmation email sent.");
        } catch (error) {
            console.error("❌ Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register for Event</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                <input type="text" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;