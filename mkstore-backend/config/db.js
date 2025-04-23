<<<<<<< HEAD
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Successfully connected to the database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });

module.exports = pool;
=======
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
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
