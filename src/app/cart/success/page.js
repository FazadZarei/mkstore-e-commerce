"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Link from "next/link";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. You will be redirected to the home page
            in 5 seconds.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
