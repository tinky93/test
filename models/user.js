const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"], 
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Email is invalid"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);