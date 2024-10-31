const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // Import path to handle file paths

dotenv.config();
const connectDB = require("./config/db");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route - Homepage to fetch and display posts
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // Assuming Post is your model
        res.send(posts); // You can render this as HTML using a templating engine or return as JSON
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Admin panel route - Serve the admin HTML file
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); // Make sure to adjust the path as necessary
});

// API Routes
app.use("/api/posts", postsRouter); // For handling post-related API requests
app.use("/api/auth", authRouter); // For handling authentication-related API requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
