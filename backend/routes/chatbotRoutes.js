const express = require("express");
const router = express.Router();
const { queryHuggingFace } = require("../h"); // Import chatbot logic
const FAQ = require("../models/FAQ"); // Import FAQ model

// ✅ Chatbot Route
router.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
      console.log("Received message:", message);
  
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
  
      // ✅ Get response from h.js (which checks knowledgeBase first)
      const reply = await queryHuggingFace(message);
  
      res.json({ reply });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ FAQ API Routes
router.post("/add-faq", async (req, res) => {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ message: "Question and answer are required" });
      }
      const newFAQ = new FAQ({ question, answer });
      await newFAQ.save();
      res.status(201).json({ message: "FAQ added successfully!" });
    } catch (error) {
      console.error("Error adding FAQ:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
router.get("/faqs", async (req, res) => {
    try {
      const faqs = await FAQ.find();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route to search FAQs based on keywords
router.get("/faqs/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const faqs = await FAQ.find({ question: { $regex: new RegExp(query, "i") } });
      res.json(faqs);
    } catch (error) {
      console.error("Error searching FAQs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
