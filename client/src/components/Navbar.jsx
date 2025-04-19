// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black text-white shadow-md bg-black/80 backdrop-blur-md border-b border-red-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide hover:text-white transition">
          EasyFEET
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/products" className="hover:text-red-500 transition">Products</Link>
          <Link to="/about" className="hover:text-red-500 transition">About</Link>
          <Link to="/cart" className="hover:text-red-500 transition">Cart</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
