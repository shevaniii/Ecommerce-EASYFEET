import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/Products/ProductsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filterProducts = () => {
    let filtered = [...products];

    if (filter === "inStock") {
      filtered = filtered.filter((p) => p.countInStock > 0);
    } else if (filter === "outOfStock") {
      filtered = filtered.filter((p) => p.countInStock === 0);
    }

    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  if (status === "loading")
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-red-500 text-center mt-10">Failed to load products.</p>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-500 tracking-wide uppercase">
        🛒 Explore All Shoes
      </h2>

      {/* Filter & Sort Panel */}
      <div className="flex flex-wrap justify-between items-center mb-10 bg-red-900 p-4 rounded-lg border border-red-600 shadow-md">
        <div className="flex gap-4 items-center">
          <label className="text-sm">Filter:</label>
          <select
            className="bg-black text-white border border-red-500 px-3 py-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-sm">Sort:</label>
          <select
            className="bg-black text-white border border-red-500 px-3 py-2 rounded"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-red-950 hover:scale-105 transition-transform duration-300 rounded-lg p-4 shadow-lg border border-red-800"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-md border border-red-700 mb-4"
            />
            <h3 className="text-xl font-bold text-red-400">{product.name}</h3>
            <p className="text-white font-semibold text-lg mt-1">₹{product.price}</p>
            <p className="text-sm text-gray-300 mt-1">
              {product.brand} |{" "}
              <span
                className={
                  product.countInStock > 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {product.countInStock > 0
                  ? `${product.countInStock} in stock`
                  : "Out of Stock"}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
