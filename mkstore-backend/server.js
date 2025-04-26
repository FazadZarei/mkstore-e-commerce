const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/products", apiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Initialize database and start server
const initServer = async () => {
  try {
    // Test database connection
    const db = await require("./config/db");

    // Test route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to MKStore API" });
    });

    // Start server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

initServer();
