import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const username = localStorage.getItem("username");

  // Fetch Resources
  useEffect(() => {
    axios.get("http://localhost:5000/api/resources/get-resources")
      .then((response) => setResources(response.data))
      .catch((error) => console.error("❌ Error fetching resources:", error));
  }, []);

  // Add Resource (Faculty Only)
  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!title || !semester || !course || !file) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("semester", semester);
    formData.append("course", course);
    formData.append("file", file);
    formData.append("username", username);

    try {
      const response = await axios.post("http://localhost:5000/api/resources/add-resource", formData);

      if (response.status === 201) {
        alert("✅ Resource Added Successfully!");
        setTitle("");
        setSemester("");
        setCourse("");
        setFile(null);
        axios.get("http://localhost:5000/api/resources/get-resources")
          .then((response) => setResources(response.data));
      } else {
        alert("⚠ Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("❌ Error adding resource:", error);
      alert("❌ Failed to add resource");
    }
  };

  const goToClassPage = (className) => {
    navigate(`/class/${className}`); // ✅ Corrected syntax for navigation
  };

  return (
    <div className="resource-container">
      {/* Animated Title and Description */}
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📚 Resources
      </motion.h1>
      <motion.p 
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Choose your class to explore subjects and resources.
      </motion.p>

      {/* Class Buttons */}
      <motion.div 
        className="class-buttons"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((className) => (
          <motion.button 
            key={className} 
            className="class-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToClassPage(className)}
          >
            {className}
          </motion.button>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
      >
        ⬅ Back to Home
      </motion.button>
    </div>
  );
};

export default Resources;
