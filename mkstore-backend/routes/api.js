const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Check and create products table if it doesn't exist
const ensureProductsTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        colors JSON,
        image1 VARCHAR(255),
        image2 VARCHAR(255),
        type VARCHAR(50) NOT NULL,
        tag VARCHAR(255),
        size JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error("Error creating products table:", error);
    throw error;
  }
};

// Check and create menu_items table if it doesn't exist
const ensureMenuItemsTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        has_submenu BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error("Error creating menu_items table:", error);
    throw error;
  }
};

// Get all menu items
router.get("/menu-items", async (req, res) => {
  try {
    await ensureMenuItemsTable();
    const [rows] = await pool.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    await ensureProductsTable();
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
router.get("/products/:id", async (req, res) => {
  try {
    await ensureProductsTable();
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create a new product
router.post("/products", async (req, res) => {
  try {
    await ensureProductsTable();
    const { title, price, colors, image1, image2, type, tag, options } =
      req.body;

    // Validate required fields
    if (!title || !price || !colors || !image1 || !type || !options) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate that size is an array
    if (!Array.isArray(options)) {
      return res.status(400).json({ error: "Options must be an array" });
    }

    // Validate image URLs
    const validateImageUrl = (url) => {
      if (!url) return null;
      try {
        new URL(url);
        return url;
      } catch (error) {
        console.error("Invalid image URL:", error);
        return null;
      }
    };

    const imageUrls = {
      image1: validateImageUrl(image1),
      image2: validateImageUrl(image2),
    };

    // Validate that at least image1 is a valid URL
    if (!imageUrls.image1) {
      return res.status(400).json({ error: "Invalid image1 URL" });
    }

    const [result] = await pool.execute(
      "INSERT INTO products (title, price, colors, image1, image2, type, tag, options) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        parseFloat(price),
        JSON.stringify(colors),
        imageUrls.image1,
        imageUrls.image2,
        type,
        tag || null,
        JSON.stringify(options),
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Error creating product",
      details: error.message,
    });
  }
});

// Update product
router.put("/products/:id", async (req, res) => {
  try {
    await ensureProductsTable();
    const { title, price, colors, image1, image2, type, tag, options } =
      req.body;
    const productId = req.params.id;

    // Validate required fields
    if (!title || !price || !colors || !image1 || !type || !options) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate that size is an array
    if (!Array.isArray(options)) {
      return res.status(400).json({ error: "Options must be an array" });
    }

    // Validate image URLs
    const validateImageUrl = (url) => {
      if (!url) return null;
      try {
        new URL(url);
        return url;
      } catch (error) {
        console.error("Invalid image URL:", error);
        return null;
      }
    };

    const imageUrls = {
      image1: validateImageUrl(image1),
      image2: validateImageUrl(image2),
    };

    // Validate that at least image1 is a valid URL
    if (!imageUrls.image1) {
      return res.status(400).json({ error: "Invalid image1 URL" });
    }

    const [result] = await pool.execute(
      "UPDATE products SET title = ?, price = ?, colors = ?, image1 = ?, image2 = ?, type = ?, tag = ?, options = ? WHERE id = ?",
      [
        title,
        parseFloat(price),
        JSON.stringify(colors),
        imageUrls.image1,
        imageUrls.image2,
        type,
        tag || null,
        JSON.stringify(options),
        productId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete product
router.delete("/products/:id", async (req, res) => {
  try {
    await ensureProductsTable();
    const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
