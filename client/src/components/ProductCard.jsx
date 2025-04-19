// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/50 transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-400">{product.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{product.description}</p>
        <p className="text-red-500 font-semibold text-lg mt-2">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
