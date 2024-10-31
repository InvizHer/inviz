const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Post", postSchema);
