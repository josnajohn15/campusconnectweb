import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./GroupChats.css";
import ParticleBackground from '../components/ParticleBackground';

const socket = io("http://localhost:5000");

// ✅ Blue-Themed Random Colors
const getRandomBlueShade = () => {
  const blueShades = ["#2196F3", "#1E88E5", "#1565C0", "#0D47A1", "#42A5F5", "#64B5F6", "#90CAF9"];
  return blueShades[Math.floor(Math.random() * blueShades.length)];
};

const GroupChats = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const username = localStorage.getItem("username") || "Anonymous";

  // ✅ Establish socket connection
  useEffect(() => {
    socket.emit("userJoined", username);

    socket.on("connect", () => console.log("✅ Socket connected successfully"));
    socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    socket.on("previousMessages", (prevMessages) => setMessages(prevMessages));
    socket.on("receiveMessage", (msg) => 
      setMessages((prev) => [...prev, msg])
    );

    socket.on("userJoined", (msg) => setStatus(msg));
    socket.on("userLeft", (msg) => setStatus(msg));
    socket.on("typing", (msg) => setStatus(msg));

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("typing");
    };
  }, []);

  // ✅ Send message function
  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { sender: username, message: input });
      setInput("");
    }
  };

  // ✅ Typing indicator
  const handleTyping = () => {
    socket.emit("typing", username);
  };

  return (
    <div className="group-chat-container">
      <div className="particle-wrapper">
        <ParticleBackground />
      </div>

      <div className="chat-container">
        <div className="status">{status}</div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === username ? "my-message" : "other-message"}`}
              style={{ background: getRandomBlueShade() }}
            >
              <p className="sender">
                <strong>{msg.sender}</strong>
                <span>{msg.emoji || "💬"}</span>
              </p>
              <p className="text">{msg.message}</p>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChats;
