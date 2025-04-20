const API_BASE_URL = "http://localhost:5001/api";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    // Transform the data to match the expected format
    return {
      LE_products: products.filter((p) => p.type === "LIMITED EDITION"),
      SALE_products: products.filter((p) => p.type === "SALE"),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu-items`);
    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
