<<<<<<< HEAD
const API_BASE_URL = "http://localhost:5001/api";
=======
const API_BASE_URL = "http://localhost:3001/api";
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
<<<<<<< HEAD
    const products = await response.json();
    // Transform the data to match the expected format
    return {
      LE_products: products.filter((p) => p.type === "LIMITED EDITION"),
      SALE_products: products.filter((p) => p.type === "SALE"),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
=======
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return dummy data as fallback
    return {
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
      ],
      SALE_products: [
        {
          id: 1,
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
          id: 2,
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
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
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
<<<<<<< HEAD
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
=======
    // Return dummy data as fallback
    return [
      {
        title: "LATEST ARRIVALS",
        href: "/collections/latest-arrivals",
      },
      {
        title: "BESTSELLERS",
        href: "/collections/best-sellers",
      },
      {
        title: "SHOP ALL",
        href: "/collections/shop-all",
      },
    ];
>>>>>>> 0fff5d76c887910c2050322b0425678a5e592877
  }
};
