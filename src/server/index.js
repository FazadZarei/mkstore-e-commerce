const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage
let products = {
  LE_products: [
    {
      id: 1,
      title: "MKI AIRPODS",
      price: "40",
      colors: "WHITE / GREY",
      image1:
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      image2:
        "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      tag: "LIMITED EDITION",
      options: ["ONE SIZE"],
    },
    {
      id: 2,
      title: "MKI SNEAKERS",
      price: "85",
      colors: "ORANGE / BLACK",
      image1:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      image2:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      tag: "LIMITED EDITION",
      options: ["6", "7", "8", "9", "10"],
    },
    {
      id: 3,
      title: "MKI T-SHIRT",
      price: "95",
      colors: "OLIVE / STONE",
      image1:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      image2:
        "https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      tag: "LIMITED EDITION",
      options: ["28", "30", "32", "34", "36"],
    },
    {
      id: 4,
      title: "MKI T-SHIRT",
      price: "175",
      colors: "PINK / RED",
      image1:
        "https://images.unsplash.com/photo-1671438118097-479e63198629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8",
      image2:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      tag: "LIMITED EDITION",
      options: ["XS", "S", "M", "L", "XL"],
    },
  ],
  SALE_products: [
    {
      id: 1,
      title: "MKI AIRPODS",
      price: "40",
      colors: "WHITE / GREY",
      image1:
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      image2:
        "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      tag: "SALE",
      options: ["ONE SIZE"],
    },
    {
      id: 2,
      title: "MKI SNEAKERS",
      price: "85",
      colors: "ORANGE / BLACK",
      image1:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      image2:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      tag: "SALE",
      options: ["6", "7", "8", "9", "10"],
    },
    {
      id: 3,
      title: "MKI T-SHIRT",
      price: "95",
      colors: "OLIVE / STONE",
      image1:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      image2:
        "https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      tag: "SALE",
      options: ["28", "30", "32", "34", "36"],
    },
    {
      id: 4,
      title: "MKI T-SHIRT",
      price: "175",
      colors: "PINK / RED",
      image1:
        "https://images.unsplash.com/photo-1671438118097-479e63198629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8",
      image2:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      tag: "SALE",
      options: ["XS", "S", "M", "L", "XL"],
    },
  ],
};

let menuItems = [
  {
    title: "LATEST ARRIVALS",
    href: "/",
  },

  {
    title: "TOPS",
    href: "#",
    hasSubmenu: true,
    submenu: [
      { title: "T-SHIRTS", href: "/collections/t-shirts" },
      { title: "HOODIES", href: "/collections/hoodies" },
      { title: "KNITWEAR", href: "/collections/knitwear" },
      { title: "SWEATS", href: "/collections/sweats" },
      { title: "SHIRTS", href: "/collections/shirts" },
      { title: "VIEW ALL", href: "/collections/tops" },
    ],
  },
  {
    title: "Manage Products",
    href: "/manage-products",
  },
];

// Products CRUD endpoints
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:type", (req, res) => {
  const type = req.params.type;
  if (products[type]) {
    res.json(products[type]);
  } else {
    res.status(404).json({ error: "Product type not found" });
  }
});

app.post("/api/products/:type", (req, res) => {
  const type = req.params.type;
  const newProduct = req.body;
  if (!products[type]) {
    products[type] = [];
  }
  newProduct.id = products[type].length + 1;
  products[type].push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:type/:id", (req, res) => {
  const type = req.params.type;
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;

  if (!products[type]) {
    return res.status(404).json({ error: "Product type not found" });
  }

  const index = products[type].findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products[type][index] = { ...products[type][index], ...updatedProduct };
  res.json(products[type][index]);
});

app.delete("/api/products/:type/:id", (req, res) => {
  const type = req.params.type;
  const id = parseInt(req.params.id);

  if (!products[type]) {
    return res.status(404).json({ error: "Product type not found" });
  }

  const index = products[type].findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products[type].splice(index, 1);
  res.status(204).send();
});

// Menu Items CRUD endpoints
app.get("/api/menu-items", (req, res) => {
  res.json(menuItems);
});

app.post("/api/menu-items", (req, res) => {
  const newMenuItem = req.body;
  menuItems.push(newMenuItem);
  res.status(201).json(newMenuItem);
});

app.put("/api/menu-items/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= menuItems.length) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menuItems[index] = { ...menuItems[index], ...req.body };
  res.json(menuItems[index]);
});

app.delete("/api/menu-items/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= menuItems.length) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menuItems.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
