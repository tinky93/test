require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const User= require('./models/user');
const port = 3000;

app.use(express.json());
app.use(cors());

// link MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Route 
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Route API
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Server startup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});