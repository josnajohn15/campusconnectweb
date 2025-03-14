const express = require("express");
const router = express.Router();
const Event = require("../models/events");

// ➤ Add Event Route
router.post("/add-event", async (req, res) => {
    const { username, title, description, date } = req.body;

    if (username !== "admin") {
        return res.status(403).json({ error: "Access Denied: Admin Only" });
    }

    if (!title || !description || !date) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newEvent = new Event({ title, description, date });
        await newEvent.save();
        res.status(201).json({ message: "Event added successfully!" });
    } catch (err) {
        console.error("Error adding event:", err);
        res.status(500).json({ error: "Failed to add event." });
    }
});

// ➤ Fetch Events Route
router.get("/get-events", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch events." });
    }
});

module.exports = router;
