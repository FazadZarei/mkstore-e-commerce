"use client";

import { useState } from "react";
import Header from "../../components/Header";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    date: "March 15, 2024",
    excerpt:
      "Discover how minimalist design principles can transform your space and lifestyle.",
    content:
      "Minimalist design is more than just an aesthetic choice; it's a way of life. By focusing on essential elements and removing unnecessary clutter, we create spaces that are both functional and beautiful. This approach not only enhances the visual appeal of your environment but also promotes a sense of calm and clarity in your daily life.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
  },
  {
    id: 2,
    title: "Sustainable Living: A Guide",
    date: "March 10, 2024",
    excerpt:
      "Learn practical tips for incorporating sustainability into your everyday life.",
    content:
      "Sustainability isn't just a trend; it's a necessity. From reducing waste to choosing eco-friendly materials, every small change contributes to a larger impact. In this guide, we explore simple yet effective ways to make your lifestyle more sustainable without compromising on style or comfort.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
  },
  {
    id: 3,
    title: "The Future of Home Decor",
    date: "March 5, 2024",
    excerpt: "Explore emerging trends and innovations in home decor for 2024.",
    content:
      "As we move forward, home decor continues to evolve with new technologies and changing lifestyles. Smart homes, sustainable materials, and multifunctional spaces are shaping the future of interior design. Discover how these trends can inspire your next home makeover.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
];

export default function Journal() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPost.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {selectedPost.date}
                </p>
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
