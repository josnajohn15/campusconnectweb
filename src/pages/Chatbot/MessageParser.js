import axios from "axios";
import React, { useState } from "react";

const MessageParser = ({ children, actions }) => {
    const [ setLastSuggestedQuestion] = useState(null);

    const parse = async (message) => {
        console.log("User message:", message);

        try {
            const response = await axios.post(
                "https://campus-connect-backend.onrender.com/chatbot/chat",
                { message },
                { headers: { "Content-Type": "application/json" } }
            );

            const aiReply = response.data.reply;

            if (aiReply) {
                if (aiReply.startsWith("Did you mean")) {
                    // ✅ Store the suggested question
                    setLastSuggestedQuestion(aiReply);
                    actions.addMessageToBotQueue(aiReply);
                } else {
                    setLastSuggestedQuestion(null); // ✅ Reset if an answer is provided
                    actions.addMessageToBotQueue(aiReply);
                }
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
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { parse, actions })
            )}
        </div>
    );
};

export default MessageParser;