"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProductById, updateProduct } from "../../../../services/api";
import Header from "../../../../components/Header";
import ProductForm from "../../../../components/ProductForm";

export default function EditProduct({ params }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const product = await fetchProductById(params.id);
        setInitialData(product);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

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

      await updateProduct(params.id, productData);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isDashboard={true} />
        <div className="p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isDashboard={true} />
        <div className="p-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isDashboard={true} />
      <div className="p-8">
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitText="Update Product"
        />
      </div>
    </div>
  );
}
