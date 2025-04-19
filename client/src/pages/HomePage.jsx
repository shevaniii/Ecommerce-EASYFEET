// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Products/ProductsSlice";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center mt-10 text-red-500">Loading...</p>;
  if (status === "failed") return <p className="text-center mt-10 text-red-500">Failed to load products</p>;

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center tracking-wider">🔥 Latest Shoes Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
