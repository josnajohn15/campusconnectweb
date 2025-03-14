import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./GroupChats.css";
import ParticleBackground from '../components/ParticleBackground';
import React from "react";

const socket = io("http://localhost:5000");

// ✅ Blue-Themed Random Colors
const getRandomBlueShade = () => {
  const blueShades = ["#2196F3", "#1E88E5", "#1565C0", "#0D47A1", "#42A5F5", "#64B5F6", "#90CAF9"];
  return blueShades[Math.floor(Math.random() * blueShades.length)];
};

const GroupChats = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const username = localStorage.getItem("username") || "Anonymous"; // Get username from localStorage

  useEffect(() => {
    socket.on("previousMessages", (prevMessages) => {
      setMessages(prevMessages);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const msgData = { sender: username, message: input };
      socket.emit("sendMessage", msgData);
      setInput(""); // Clear input field
    }
  };

  return (
    <div className="group-chat-container">
      {/* 🔹 Particle Background */}
      <div className="particle-wrapper">
        <ParticleBackground />
      </div>

      {/* Chat UI */}
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === username ? "my-message" : "other-message"}`}
              style={{ background: getRandomBlueShade() }} // ✅ Uses only blue shades
            >
              <p className="sender"><strong>{msg.sender}</strong></p>
              <p className="text">{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChats;
