const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registerprojetprodigy")
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.error("Database connection error:", err.message);
});

// Define the schema for a user
const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure the email is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const collection = mongoose.model("User", LoginSchema);

module.exports = collection;
