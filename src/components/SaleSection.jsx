"use client";

import Image from "next/image";
import React from "react";

const SaleSection = ({ images, title, className = "" }) => {
  return (
    <section className={`px-10 ${className}`}>
      <div className={`${images.length > 1 ? "flex" : ""} h-screen`}>
        {images.length === 1 ? (
          <div className="relative h-screen">
            <Image
              unoptimized
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          images.map((image, index) => (
            <div key={index} className="relative w-1/2">
              <Image
                unoptimized
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
          ))
        )}
      </div>
      <div className="text-center text-white flex justify-between items-center mt-3 mb-8">
        <h1 className="text-xl text-black font-bold mb-4">{title}</h1>
        <button
          className="bg-white tracking-wider text-black text-xs ease-in-out duration-300 border-b border-black hover:border-black/20
        "
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default SaleSection;
