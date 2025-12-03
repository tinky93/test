const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        // ok
        res.json({ message: "Registration successful!" });

    } catch (err) {
        // Validation Error من Mongoose
        if (err.name === 'ValidationError' && err.errors) {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: messages.join(", ") });
        }

        // Duplicate email
        if (err.code === 11000) {
            return res.status(400).json({ error: "The email address is already in use" });
        }

        //  Any error 
        console.error('Unexpected Error:', err);
        return res.status(500).json({ error: "An error occurred on the server. Please try again" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful!' });

    } catch (err) {
        console.error('Unexpected Error', err);
        res.status(400).json({ error: "Entered an error, please try again" });
    }
});

module.exports = router;