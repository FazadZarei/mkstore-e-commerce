"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleQuantityChange = async (productId, newQuantity) => {
    setIsUpdating(true);
    await updateQuantity(productId, newQuantity);
    setIsUpdating(false);
  };

  const handleCheckout = () => {
    clearCart();
    router.push("/cart/success");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image1}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={isUpdating}
                      className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-2 text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      disabled={isUpdating}
                      className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-lg font-medium text-gray-900">
                Total: ${total.toFixed(2)}
              </span>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
