const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
<<<<<<< HEAD
const apiRoutes = require("./routes/api");
=======
<<<<<<< HEAD
const apiRoutes = require("./routes/api");
=======
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
>>>>>>> 5b1f41119e7facfc8860b0b7d1099c90ebaecfec

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5b1f41119e7facfc8860b0b7d1099c90ebaecfec
// API Routes
app.use("/api", apiRoutes);

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
<<<<<<< HEAD
=======
=======
// Initialize database and start server
const initServer = async () => {
  try {
    // Database will be created if it doesn't exist
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
>>>>>>> 5b1f41119e7facfc8860b0b7d1099c90ebaecfec
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
