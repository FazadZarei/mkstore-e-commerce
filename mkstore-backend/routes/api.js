const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all menu items
router.get("/menu-items", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    // Convert BLOBs to base64 for all products
    const products = rows.map((product) => ({
      ...product,
      image1: product.image1.toString("base64"),
      image2: product.image2.toString("base64"),
    }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = rows[0];
    // Convert BLOB to base64 for sending to client
    product.image1 = product.image1.toString("base64");
    product.image2 = product.image2.toString("base64");

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create a new product
router.post("/products", async (req, res) => {
  try {
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

    const [result] = await db.query(
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

    const [result] = await db.query(
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
    const result = await db.query("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
