import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resources.css";

const Resources = () => {
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

    return (
        <div className="resource-container">
            <h1>📚 Resources</h1>

            {/* Faculty Only - Add Resource Form */}
            {username === "faculty" && (
                <form className="add-resource-form" onSubmit={handleAddResource}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="submit">Add Resource</button>
                </form>
            )}

            {/* Display Resources for All Users */}
            <div className="resource-list">
                {resources.map((resource) => (
                    <div key={resource._id} className="resource-card">
                        <h3>{resource.title}</h3>
                        <p><strong>Semester:</strong> {resource.semester}</p>
                        <p><strong>Course:</strong> {resource.course}</p>
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
