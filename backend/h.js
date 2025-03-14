require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

// ✅ Load the college knowledge base
const knowledgeBase = JSON.parse(fs.readFileSync("college_data.json", "utf-8"));

async function queryHuggingFace(question) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const model = "HuggingFaceH4/zephyr-7b-beta";

    console.log("Using Hugging Face API Key:", apiKey ? "Loaded" : "Not Loaded!");  // Debugging
    console.log("User Question:", question);

    // ✅ Check Local Knowledge Base First
    let lowerQuestion = question.toLowerCase();
    for (let category in knowledgeBase) {
        for (let key in knowledgeBase[category]) {
            if (lowerQuestion.includes(key.toLowerCase())) {
                console.log("✅ Response from Knowledge Base:", knowledgeBase[category][key]);
                return knowledgeBase[category][key]; // ✅ Return answer from local data
            }
        }
    }

    // ✅ Log API Request
    console.log(`⏳ Sending request to Hugging Face Model: ${model}`);

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            { inputs: question },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );

        console.log("✅ Hugging Face API Response:", response.data);

        if (response.data && response.data.length > 0 && response.data[0].generated_text) {
            return response.data[0].generated_text;
        } else {
            return "Sorry, I couldn't find an answer to your question.";
        }
    } catch (error) {
        console.error("❌ Hugging Face API Error:", error.response ? error.response.data : error.message);
        return "An error occurred while fetching the response.";
    }
}

module.exports = { queryHuggingFace };
