require("dotenv").config();


// Load environment variables

console.log("Hugging Face API Key:", process.env.HUGGINGFACE_API_KEY || "Not Loaded!"); // Debugging

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const socketIo = require("socket.io");
const User = require("./models/User");
const Message = require("./models/Message");
const Event = require("./models/events");
require("dotenv").config();

const app = express();

const { router: groupChatRoutes, setupGroupChat } = require("./routes/groupchats");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");





const socketIo = require("socket.io");

// Import Models
const User = require("./models/User");
const Message = require("./models/Message");
const Event = require("./models/events");

// Import Group Chat Routes & Socket Handling
const { router: groupChatRoutes, setupGroupChat } = require("./routes/groupchats");
const eventRoutes = require('./routes/eventRoutes');
const announcementRoutes = require("./routes/announcementRoutes");


const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});



const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hari:fisat@cluster0.styn5.mongodb.net/test";

// ✅ Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ Connect to MongoDB

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hari:fisat@cluster0.styn5.mongodb.net/test";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===================== AUTH ROUTES =====================


// ✅ Register Route

// ✅ Register Route (No Double Hashing)

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }


    const newUser = new User({ username, password });

    const newUser = new User({ username, password }); // Pass plain password, hashing is handled in schema

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Login Route

// ✅ Login Route (With Debugging)

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);




    console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Group Chat Routes
app.use("/groupchat", groupChatRoutes);

setupGroupChat(io);

// ✅ Events & Announcements
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);

// ✅ Chatbot Routes
app.use("/chatbot", chatbotRoutes);


const fs = require("fs");
const path = require("path");
const multer = require("multer");
// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Ensure "uploads" directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Define Mongoose Schema for Resources
const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
const Resource = mongoose.model("Resource", ResourceSchema);

// ✅ API Route to handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { title, description } = req.body;
    const filePath = req.file.path;
    const newResource = new Resource({ title, description, filePath });
    await newResource.save();
    res.status(200).json({ message: "File uploaded successfully!", filePath });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
});

// ✅ API Route to Fetch All Resources
app.get("/resources", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route to Fetch Resources by Title
app.get("/resources/:title", async (req, res) => {
  try {
    const title = req.params.title.replace(/-/g, " ");
    const resources = await Resource.find({ title: { $regex: new RegExp(title, "i") } });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {


// ✅ Initialize Group Chat Socket.IO
setupGroupChat(io);

//Events
app.use("/api/events", eventRoutes); 

//Announcements 
app.use("/api/announcements", announcementRoutes);

const chatbotRoutes = require("./routes/chatbotRoutes"); // ✅ Import chatbot route
app.use("/chatbot", chatbotRoutes); // ✅ Mount chatbot routes under /chatbot

// ✅ Start Server
server.listen(PORT, () => {

  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
