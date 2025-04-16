import React, { useState } from "react";
import axios from "axios";

const RUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please fill in all fields and select a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
  
    try {
      console.log("🔄 Uploading file...");
  
      const response = await axios.post("https://campusconnectweb.onrender.com/api/resources/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("✅ Upload success:", response.data);
      alert("File uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("❌ Upload error:", error.response?.data || error.message);
      alert("File upload failed: " + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload Resource</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default RUpload;

