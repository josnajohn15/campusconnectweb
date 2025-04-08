import React, { useState } from "react"; // for togglebutton
import Chatbot from "react-chatbot-kit";
import config from "./Chatbot/config";
import MessageParser from "./Chatbot/MessageParser";
import ActionProvider from "./Chatbot/ActionProvider"; // for styling by ourselves
import "react-chatbot-kit/build/main.css"; // for predefined chatbot styling
import './Chatbot.css'; // Make sure to import your CSS

// Rename your component to avoid the conflict
const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false); // initially showchatbot is false

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
      {/* Chatbot Toggle Button */}
    
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        💬
      </button>

      {/* Chatbot Container */}
      {showChatbot && ( // if showchatbot is true
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
