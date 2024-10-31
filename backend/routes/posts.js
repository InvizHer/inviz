const express = require("express");
const Post = require("../models/Post");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

// Get a single post by title
router.get("/:title", async (req, res) => {
    try {
        const post = await Post.findOne({ title: req.params.title });
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error fetching post" });
    }
});

// Create a new post (protected route)
router.post("/", authenticateToken, async (req, res) => {
    const { title, content, imageUrl } = req.body;
    try {
        const newPost = new Post({ title, content, imageUrl });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: "Error creating post" });
    }
});

module.exports = router;
