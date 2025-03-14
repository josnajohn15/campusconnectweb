import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Rfaculty.css";

const subjectsMapping = {
  S1: ["LINEAR ALGEBRA AND CALCULUS", "ENGINEERING PHYSICS A", "ENGINEERING GRAPHICS", "LIFE SKILLS", "ENGINEERING CHEMISTRY"],
  S2: ["LINEAR ALGEBRA AND CALCULUS", "ENGINEERING MECHANICS", "BASICS OF ELECTRICAL & ELECTRONICS", "BASICS OF CIVIL & MECHANICAL"],
  S3: ["Discrete Mathematical Structures", "Data Structures", "Logic System Design", "Professional Ethics"],
  S4: ["COMPUTER ORGANISATION & ARCHITECTURE", "DATABASE MANAGEMENT SYSTEMS", "OPERATING SYSTEMS", "GRAPH THEORY"],
  S5: ["FORMAL LANGUAGES & AUTOMATA THEORY", "COMPUTER NETWORKS", "SYSTEM SOFTWARE", "DISASTER MANAGEMENT"],
  S6: ["COMPUTER GRAPHICS", "ALGORITHM ANALYSIS & DESIGN", "DATA ANALYTICS", "PROGRAMMING IN PYTHON"],
  S7: ["NATURAL LANGUAGE PROCESSING", "MACHINE LEARNING", "CLOUD COMPUTING", "ARTIFICIAL INTELLIGENCE"],
  S8: ["DISTRIBUTED COMPUTING", "DATA MINING", "MOBILE COMPUTING", "INTERNET OF THINGS"],
};

const Rfaculty = () => {
  const { className } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (subjectsMapping[className]) {
      setSubjects(subjectsMapping[className]);
    }
  }, [className]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please select a subject, enter a description, and choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("className", className);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Resource for {className}</h2>

        <label>Subject:</label>
        <select value={title} onChange={(e) => setTitle(e.target.value)} className="styled-select">
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>

        <label>Description:</label>
        <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="styled-input" />

        <label>Upload File:</label>
        <input id="fileInput" type="file" onChange={handleFileChange} className="styled-file-input" />

        <button onClick={handleUpload} className="upload-btn">Upload</button>
      </div>
    </div>
  );
};

export default Rfaculty;
