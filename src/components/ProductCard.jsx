import React from "react";

const ProductCard = ({
  image1,
  image2,
  title,
  price,
  colors,
  tag,
  options,
}) => {
  return (
    <a href="#" className="group block overflow-hidden text-primary">
      <div className="relative h-[350px] sm:h-[650px]">
        <img
          src={image1}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
        />

        <img
          src={image2}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
        <div
          className={`absolute top-0 -left-1 ${
            tag === "SALE" ? "text-red-800" : "text-black"
          } text-[10px] px-4 py-2`}
        >
          {tag}
        </div>
        <div className="absolute group-hover:opacity-100 opacity-0 bottom-0 h-10    w-full bg-white/80 text-black text-xs pt-3">
          <div className="flex items-center justify-start gap-4 pl-2 text-[10px] font-light">
            {options?.map((option) => (
              <p key={option} className="hover:underline">
                {option}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-white pt-3 text-xs">
        <h3 className="font-medium font-primary text-xs tracking-wide leading-5">
          {title}
        </h3>
        <p className="text-gray-600">{colors}</p>
        <p className="mt-2">£{price}</p>
      </div>
    </a>
  );
};

export default ProductCard;
