"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../../services/api";
import Header from "../../../components/Header";
import ProductForm from "../../../components/ProductForm";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (
        !formData.title ||
        !formData.price ||
        !formData.colors ||
        !formData.image1 ||
        !formData.image2 ||
        !formData.type
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Convert price to number
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      console.log("Submitting product data:", productData); // Debug log

      await createProduct(productData);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isDashboard={true} />
      <div className="p-8">
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitText="Create Product"
        />
      </div>
    </div>
  );
}
