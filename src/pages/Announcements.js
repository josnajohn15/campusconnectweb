import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Announcements.css";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get("https://campusconnectweb.onrender.com/api/announcements/get-announcements")
            .then((response) => setAnnouncements(response.data))
            .catch((error) => console.error("❌ Error fetching announcements:", error));
    }, []);

    const handleAddAnnouncement = async () => {
        if (!title || !message) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("https://campusconnectweb.onrender.com/api/announcements/add-announcement", {
                username,
                title,
                message,
            });

            if (response.status === 201) {
                alert("✅ Announcement Added Successfully!");
                setTitle("");
                setMessage("");
                axios.get("https://campusconnectweb.onrender.com/api/announcements/get-announcements")
                    .then((response) => setAnnouncements(response.data));
            } else {
                alert("⚠ Something went wrong. Try again.");
            }
        } catch (error) {
            console.error("❌ Error adding announcement:", error);
            alert("❌ Failed to add announcement");
        }
    };

    return (
        <div className="announcement-container">
            <h1>📢 Important Announcements</h1>

            {username === "faculty" && (
                <div className="add-announcement-form improved-form">
                    <h2>➕ Add New Announcement</h2>
                    <input
                        type="text"
                        className="styled-input"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="styled-input"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="styled-button" onClick={handleAddAnnouncement}>Add Announcement</button>
                </div>
            )}

            <div className="announcement-list">
                {announcements.map((announcement) => (
                    <div key={announcement._id} className="announcement-card">
                        <h3>{announcement.title}</h3>
                        <p>{announcement.message}</p>
                        <p className="announcement-date">
                            {moment(announcement.createdAt).format("dddd, MMMM DD, YYYY")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
