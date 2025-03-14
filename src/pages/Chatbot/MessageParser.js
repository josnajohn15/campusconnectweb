import axios from "axios";
import React from "react";
const MessageParser = ({ children, actions }) => {
    const parse = async (message) => {
        console.log("User message:", message); // Debugging

        try {
          const response = await axios.post("http://localhost:5000/chatbot/chat",

                { message }, 
                { headers: { "Content-Type": "application/json" } }  // ✅ Correct JSON format
            );
            const aiReply = response.data.reply; 

            if (aiReply) {
                actions.addMessageToBotQueue(aiReply);
            } else {
                actions.addMessageToBotQueue("Sorry, I couldn't understand that. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            actions.addMessageToBotQueue("An error occurred while fetching the response.");
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => React.cloneElement(child, { parse, actions }))}
        </div>
    );
};

export default MessageParser;
