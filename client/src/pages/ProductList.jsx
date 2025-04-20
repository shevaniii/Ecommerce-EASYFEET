import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, status } = useSelector((state) => state.products);

  if (status === "loading") return <p className="text-white text-center">Loading...</p>;
  if (status === "failed") return <p className="text-red-500 text-center">Failed to load products.</p>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold text-red-500 mb-8 text-center tracking-wider">
        👟 All Shoes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-red-900 rounded-xl p-4 hover:shadow-xl transition-all duration-300 border border-red-500"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md border-2 border-red-600 mb-4"
            />
            <h3 className="text-xl font-bold text-red-400 mb-1">{product.name}</h3>
            <p className="text-white font-semibold">₹{product.price}</p>
            <p className="text-sm mt-1">
              Stock:{" "}
              <span
                className={product.countInStock > 0 ? "text-green-400" : "text-red-400"}
              >
                {product.countInStock > 0 ? `${product.countInStock} left` : "Out of Stock"}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
