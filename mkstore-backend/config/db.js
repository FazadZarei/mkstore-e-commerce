const mysql = require("mysql2");
require("dotenv").config();

// Initial connection without database specified
const initialConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create initial connection pool
const initialPool = mysql.createPool(initialConfig);
const initialPromisePool = initialPool.promise();

// Function to create database if it doesn't exist
async function setupDB() {
  try {
    // Create database if it doesn't exist
    await initialPromisePool.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`Database ${process.env.DB_NAME} checked/created successfully`);

    // Close initial connection
    await initialPromisePool.end();

    // Create new pool with database specified
    const dbConfig = {
      ...initialConfig,
      database: process.env.DB_NAME,
    };

    const pool = mysql.createPool(dbConfig);
    const promisePool = pool.promise();

    // Test the connection
    const connection = await promisePool.getConnection();
    console.log("Database connected successfully");
    connection.release();

    return promisePool;
  } catch (err) {
    console.error("Database setup failed:", err);
    throw err;
  }
}

// Export the promise pool after database creation
module.exports = setupDB();
