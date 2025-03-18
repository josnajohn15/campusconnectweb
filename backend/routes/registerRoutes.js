const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
});

// POST route to register a student
router.post("/", async (req, res) => {
    try {
        const { name, department, semester, email, phone, eventId } = req.body;

        // Create a new registration
        const newRegistration = new Registration({
            name,
            department,
            semester,
            email,
            phone,
            eventId,
        });

        // Save to MongoDB
        await newRegistration.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Event Registration Confirmation",
            text: `Hello ${name},\n\nYou have successfully registered for the event with ID: ${eventId}. \n\nThank you for registering!\nCampus Connect Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(201).json({ message: "Registration successful, confirmation email sent." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});

module.exports = router;