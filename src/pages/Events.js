import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./Events.css";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const username = localStorage.getItem('username'); // Get username from storage

    const fetchEvents = async () => {
        try {
            const response = await axios.get("https://campusconnectweb.onrender.com/api/events/get-events");
            setEvents(response.data);
        } catch (error) {
            console.error("❌ Error fetching events", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEvent = async () => {
        if (!title || !description || !date) {
            alert('All fields are required.');
            return;
        }

        const formattedDate = new Date(date).toISOString();
        const newEvent = { username, title, description, date: formattedDate };

        try {
            const response = await axios.post("https://campusconnectweb.onrender.com/api/events/add-event", newEvent);
            if (response.status === 201) {
                alert("✅ Event Added Successfully!");
                setTitle("");
                setDescription("");
                setDate("");
                fetchEvents(); // Refresh event list after adding
            } else {
                alert("⚠ Something went wrong. Try again.");
            }
        } catch (error) {
            console.error("❌ Error adding event:", error.response?.data || error.message);
            alert("❌ Failed to add event");
        }
    };

    return (
        <div className="event-container">
            <h1>🎉 Upcoming College Events</h1>

            {username === 'admin' && (
                <div className="add-event-form upgraded">
                    <h2>➕ Add New Event</h2>
                    <input
                        type="text"
                        className="styled-input"
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="date"
                        className="styled-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="text"
                        className="styled-input"
                        placeholder="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="styled-button" onClick={handleAddEvent}>Add Event</button>
                </div>
            )}

            <div className="event-list">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <div className="event-date">
                            <span>{moment(event.date).format("ddd")}</span>
                            <br />
                            {moment(event.date).format("MMM DD")}
                        </div>
                        <div className="event-details">
                            <h3>{event.title}</h3>
                            <p>{moment(event.date).format("dddd, MMMM DD, YYYY")}</p>
                            <p>{event.description}</p>
                            {/* Register Button */}
                            <button 
                                className="register-btn" 
                                onClick={() => navigate(`/register/${event._id}`)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
