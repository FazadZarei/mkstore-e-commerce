"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductForm({
  initialData = {
    title: "",
    price: "",
    colors: "",
    image1: "",
    image2: "",
    type: "LIMITED EDITION",
    tag: "",
    options: "",
  },
  onSubmit,
  loading = false,
  error = null,
  submitText = "Create Product",
}) {
  const [formData, setFormData] = useState(() => {
    if (!initialData) {
      return {
        title: "",
        price: "",
        colors: "",
        image1: "",
        image2: "",
        type: "LIMITED EDITION",
        tag: "",
        options: "",
      };
    }
    return initialData;
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      colors: formData.colors.split(",").map((color) => color.trim()),
      options:
        formData?.options && !Array.isArray(formData?.options)
          ? formData?.options?.split(",")?.map((option) => option?.trim())
          : Array.isArray(formData?.options)
          ? formData.options
          : [],
    };

    onSubmit(processedData);
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {submitText === "Create Product" ? "Add New Product" : "Edit Product"}
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colors *
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter colors separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options
              </label>
              <input
                type="text"
                name="options"
                value={formData.options}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter options separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              >
                <option value="LIMITED EDITION">Limited Edition</option>
                <option value="SALE">Sale</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter product tag"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image 1 URL *
              </label>
              <input
                type="url"
                name="image1"
                value={formData.image1}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image 2 URL *
              </label>
              <input
                type="url"
                name="image2"
                value={formData.image2}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter image URL"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : submitText}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
