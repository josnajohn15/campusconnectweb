const express = require("express");
const router = express.Router();
const { queryHuggingFace } = require("../h"); // Import chatbot logic

let previousInteraction = null; // Store previous question suggestion

// ✅ Chatbot Route
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message);

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // ✅ Pass previousInteraction to query function
        const reply = await queryHuggingFace(message, previousInteraction);

        if (typeof reply === "object" && reply.suggestion) {
            // ✅ If a question is suggested, store the interaction
            previousInteraction = { category: reply.category, key: reply.key };
            return res.json({ reply: reply.suggestion });
        } else {
            // ✅ If an answer is provided, reset previous interaction
            previousInteraction = null;
            return res.json({ reply });
        }
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;