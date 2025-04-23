const express = require("express");
const cors = require("cors");
require("dotenv").config();
<<<<<<< HEAD
const apiRoutes = require("./routes/api");
=======
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// API Routes
app.use("/api", apiRoutes);

// Initialize database and start server
const initServer = async () => {
  try {
    // Test database connection
=======
// Initialize database and start server
const initServer = async () => {
  try {
    // Database will be created if it doesn't exist
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
    const db = await require("./config/db");

    // Test route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to MKStore API" });
    });

    // Start server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

initServer();
