const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const connectDB = require("./config/db");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to my website!'); // You can customize this message
});

// Routes
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
