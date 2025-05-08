const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Check and create users table if it doesn't exist
const ensureUsersTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
};

// Signup route
router.post("/signup", async (req, res) => {
  try {
    // Ensure users table exists
    await ensureUsersTable();

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Ensure users table exists
    await ensureUsersTable();

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
