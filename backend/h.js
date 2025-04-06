require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

// ✅ Load the college knowledge base
const knowledgeBase = JSON.parse(fs.readFileSync("college_data.json", "utf-8"));

// ✅ Define keyword-question mappings
const keywordMappings = {
    // 📍 Campus Location
    "location": { category: "campuslocation", key: "location" },
    "situated": { category: "campuslocation", key: "location" },
    "where is the college": { category: "campuslocation", key: "location" },
    "address": { category: "campuslocation", key: "location" },
    "college address": { category: "campuslocation", key: "location" },
    "campus location": { category: "campuslocation", key: "location" },

    // ℹ General Info
    "established": { category: "general_info", key: "established" },
    "when was it founded": { category: "general_info", key: "established" },
    "founding year": { category: "general_info", key: "established" },
    "history": { category: "general_info", key: "established" },
    "motto": { category: "general_info", key: "motto" },
    "tagline": { category: "general_info", key: "motto" },
    "vision": { category: "general_info", key: "vision" },
    "mission": { category: "general_info", key: "mission" },

    // 🎓 Admissions & Fees
    "admission": { category: "admissions", key: "procedures" },
    "how to apply": { category: "admissions", key: "procedures" },
    "application process": { category: "admissions", key: "procedures" },
    "eligibility criteria": { category: "admissions", key: "procedures" },
    "admission requirements": { category: "admissions", key: "procedures" },
    "fees": { category: "fees", key: "structure" },
    "fee structure": { category: "fees", key: "structure" },
    "tuition fees": { category: "fees", key: "structure" },
    "course fees": { category: "fees", key: "structure" },

    // 📚 Programs
    "btech": { category: "programs", key: "BTech" },
    "bachelor courses": { category: "programs", key: "BTech" },
    "ug courses": { category: "programs", key: "BTech" },
    "mtech": { category: "programs", key: "MTech" },
    "masters courses": { category: "programs", key: "MTech" },
    "pg courses": { category: "programs", key: "MTech" },
    "mba": { category: "programs", key: "MBA" },
    "business management": { category: "programs", key: "MBA" },
    "mca": { category: "programs", key: "MCA" },
    "computer applications": { category: "programs", key: "MCA" },
    "phd": { category: "programs", key: "PhD" },
    "doctoral programs": { category: "programs", key: "PhD" },
    "research programs": { category: "programs", key: "PhD" },

    // 👨‍🏫 Faculty
    "faculty": { category: "faculty", key: "HOD" },
    "who are the HODs": { category: "faculty", key: "HOD" },
    "department heads": { category: "faculty", key: "HOD" },
    "professors": { category: "faculty", key: "HOD" },
    "faculty members": { category: "faculty", key: "HOD" },

    // 🏢 Facilities
    "hostel": { category: "facilities", key: "hostel" },
    "is there a hostel": { category: "facilities", key: "hostel" },
    "accommodation": { category: "facilities", key: "hostel" },
    "residential facilities": { category: "facilities", key: "hostel" },
    "library": { category: "facilities", key: "library" },
    "does it have a library": { category: "facilities", key: "library" },
    "books collection": { category: "facilities", key: "library" },
    "digital library": { category: "facilities", key: "library" },
    "transport": { category: "facilities", key: "transport" },
    "bus service": { category: "facilities", key: "transport" },
    "campus transport": { category: "facilities", key: "transport" },
    "labs": { category: "facilities", key: "labs" },
    "practical labs": { category: "facilities", key: "labs" },
    "research labs": { category: "facilities", key: "labs" },
    "sports": { category: "facilities", key: "sports" },
    "gym": { category: "facilities", key: "sports" },
    "sports facilities": { category: "facilities", key: "sports" },
    "athletics": { category: "facilities", key: "sports" },
    "canteen": { category: "facilities", key: "canteen" },
    "food court": { category: "facilities", key: "canteen" },
    "mess": { category: "facilities", key: "canteen" },

    // 🎭 Events
    "ICEFOSS": { category: "events", key: "ICEFOSS" },
    "foss event": { category: "events", key: "ICEFOSS" },
    "tech fests": { category: "events", key: "tech_fests" },
    "technical events": { category: "events", key: "tech_fests" },
    "cultural fests": { category: "events", key: "cultural_fests" },
    "college fest": { category: "events", key: "cultural_fests" },
    "student events": { category: "events", key: "cultural_fests" },
    "hackathons": { category: "events", key: "tech_fests" },

    // 💼 Placements
    "placements": { category: "placementoverview", key: "placements" },
    "placement stats": { category: "placementoverview", key: "placements" },
    "recruiters": { category: "placementoverview", key: "recruiters" },
    "which companies visit": { category: "placementoverview", key: "recruiters" },
    "job opportunities": { category: "placementoverview", key: "placements" },
    "internships": { category: "placementoverview", key: "placements" },

    // ☎ Contact
    "contact": { category: "contact", key: "details" },
    "how to contact": { category: "contact", key: "details" },
    "email": { category: "contact", key: "details" },
    "phone number": { category: "contact", key: "details" },
    "website": { category: "contact", key: "website" },
    "official site": { category: "contact", key: "website" },
    "college website": { category: "contact", key: "website" }
};

// ✅ Store previous keyword for confirmation
let pendingKeyword = null;

async function queryHuggingFace(question) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const model = "HuggingFaceH4/zephyr-7b-beta";

    console.log("User Question:", question);
    let lowerQuestion = question.toLowerCase();

    // ✅ If user confirms the previous suggestion
    if (pendingKeyword && lowerQuestion.includes("yes")) {
        let { category, key } = keywordMappings[pendingKeyword];
        pendingKeyword = null; // Reset after confirmation
        return knowledgeBase[category][key] || "I couldn't find the answer.";
    }

    // ✅ If user denies the suggestion
    if (pendingKeyword && lowerQuestion.includes("no")) {
        pendingKeyword = null; // Reset and wait for a new question
        return "Okay! Please rephrase your question.";
    }

    // ✅ Check if the question matches any keywords
    for (let keyword in keywordMappings) {
        if (lowerQuestion.includes(keyword)) {
            console.log("✅ Matched Keyword:", keyword);
            pendingKeyword = keyword; // Store the keyword
            return `Did you mean "${keyword}"? (yes/no)`;

        }
    }

    // ✅ If no keyword is matched, check knowledge base directly
    for (let category in knowledgeBase) {
        for (let key in knowledgeBase[category]) {
            if (lowerQuestion.includes(key.toLowerCase())) {
                console.log("✅ Response from Knowledge Base:", knowledgeBase[category][key]);
                return knowledgeBase[category][key];
            }
        }
    }

    // ✅ If no match found, send request to Hugging Face API
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,  // ✅ Corrected
            { inputs: question },
            { headers: { Authorization: `Bearer ${apiKey}` } }  // ✅ Corrected
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