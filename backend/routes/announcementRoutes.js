const express = require("express");
const Announcement = require("../models/announcements");

const router = express.Router();

// ➕ Add Announcement (Faculty Only)
router.post("/add-announcement", async (req, res) => {
    const { username, title, message } = req.body;

    // Only faculty can add announcements
    if (username !== "faculty") {
        return res.status(403).json({ error: "Unauthorized: Only faculty can add announcements" });
    }

    try {
        const newAnnouncement = new Announcement({ title, message });
        await newAnnouncement.save();
        res.status(201).json({ message: "Announcement added successfully" });
    } catch (error) {
        console.error("❌ Error adding announcement:", error);
        res.status(500).json({ error: "Failed to add announcement" });
    }
});

// 📋 Get All Announcements (For All Users)
router.get("/get-announcements", async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        console.error("❌ Error fetching announcements:", error);
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
});

module.exports = router;
