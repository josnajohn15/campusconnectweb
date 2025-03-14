const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

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

    try {
      // ✅ Fetch all previous messages when user connects
      const messages = await Message.find().sort({ timestamp: 1 });
      socket.emit("previousMessages", messages);
    } catch (error) {
      console.error("❌ Error fetching previous messages:", error);
    }

    // ✅ Listen for new messages
    socket.on("sendMessage", async (data) => {
      console.log("📩 Received message data:", data);

      if (!data.sender || !data.message) {
        console.error("❌ Missing required fields:", data);
        return;
      }

      try {
        // ✅ Save message to MongoDB
        const newMessage = new Message({
          sender: data.sender,
          message: data.message,
          timestamp: new Date(), // Ensure timestamp is properly set
        });

        const savedMessage = await newMessage.save();
        console.log("✅ Message saved to DB:", savedMessage);

        // ✅ Broadcast message to all connected users
        io.emit("receiveMessage", savedMessage);
      } catch (error) {
        console.error("❌ Error saving message to DB:", error.message);
      }
    });

    // ✅ Handle user disconnection
    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });
};

module.exports = { router, setupGroupChat };
