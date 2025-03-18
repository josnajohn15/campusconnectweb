const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },  
  message: { type: String, required: true },
  emotion: { type: String, required: false }, // New field for detected emotion
  emoji: { type: String, required: false },   // New field for emoji mapping
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
