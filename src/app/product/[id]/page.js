"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";
import { useCart } from "../../../context/CartContext";

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(1);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/products/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {error || "Product not found"}
            </h1>
            <button
              onClick={() => router.push("/")}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative h-96">
              <Image
                src={selectedImage === 1 ? product.image1 : product.image2}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedImage(1)}
                className={`relative h-20 w-20 ${
                  selectedImage === 1 ? "ring-2 ring-black" : ""
                }`}
              >
                <Image
                  src={product.image1}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </button>
              <button
                onClick={() => setSelectedImage(2)}
                className={`relative h-20 w-20 ${
                  selectedImage === 2 ? "ring-2 ring-black" : ""
                }`}
              >
                <Image
                  src={product.image2}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-gray-900 mb-6">
              ${product.price}
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <h2 className="text-sm font-medium text-gray-900">Type</h2>
                <p className="mt-1 text-sm text-gray-500">{product.type}</p>
              </div>
              {product.tag && (
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Tag</h2>
                  <p className="mt-1 text-sm text-gray-500">{product.tag}</p>
                </div>
              )}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Colors</h2>
                  <div className="mt-2 flex space-x-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
