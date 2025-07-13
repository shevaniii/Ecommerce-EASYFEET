import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Products/ProductsSlice";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const posters = [
  { id: 1, image: "/banner1.jpg", title: "Unleash Your Speed", subtitle: "Discover our premium running shoes" },
  { id: 2, image: "/banner2.jpg", title: "Walk With Power", subtitle: "New arrivals for your daily hustle" },
  { id: 3, image: "/banner3.jpg", title: "Style That Moves", subtitle: "Redefine your streetwear game" }
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading")
    return <p className="text-center mt-10 text-red-500">Loading...</p>;
  if (status === "failed")
    return <p className="text-center mt-10 text-red-500">Failed to load products</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔥 Hero Banner / Slider */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {posters.map((poster, index) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "z-10" : "z-0"
            }`}
          >
            <img
              src={poster.image}
              alt="Poster"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                {poster.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200">
                {poster.subtitle}
              </p>
              <Link
                to="/products"
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
              >
                Explore Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 👟 Product Listing */}
      <div className="px-8 py-16">
        <h1 className="text-4xl font-bold text-red-500 mb-10 text-center tracking-wider">
          👟 Latest Shoes Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
