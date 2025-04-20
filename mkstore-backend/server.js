const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and start server
const initServer = async () => {
  try {
    // Database will be created if it doesn't exist
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
