const express = require("express");
const router = express.Router();
const Sentiment = require("sentiment");
const Message = require("../models/Message");

const sentiment = new Sentiment();

const getEmojiForSentiment = (score) => {
  if (score > 3) return "😊";
  if (score > 1) return "🙂";
  if (score < -3) return "😔";
  if (score < -1) return "😐";
  return "💬";
};

router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
});

const setupGroupChat = (io) => {
  io.on("connection", async (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("userJoined", (username) => {
      console.log(`🚶‍♂️ ${username} joined the chat`);
      io.emit("userJoined", `${username} joined the chat`);
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", `${username} is typing...`);
    });

    socket.on("sendMessage", async (data) => {
      console.log("📩 Received message data:", data);

      const analysis = sentiment.analyze(data.message);
      const emoji = getEmojiForSentiment(analysis.score);

      try {
        const newMessage = new Message({
          sender: data.sender,
          message: data.message,
          emoji,
          timestamp: new Date(),
        });

        const savedMessage = await newMessage.save();
        io.emit("receiveMessage", savedMessage);
      } catch (error) {
        console.error("❌ Error saving message to DB:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
      io.emit("userLeft", `A user has left the chat`);
    });
  });
};

module.exports = { router, setupGroupChat };
