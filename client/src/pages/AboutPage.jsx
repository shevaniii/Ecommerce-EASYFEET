// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-6 tracking-wide">
          About EasyFEET
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          EasyFEET is your go-to destination for premium, stylish, and comfortable footwear. We believe shoes are more than just fashion – they represent personality, purpose, and passion. Whether you're looking for running shoes, streetwear sneakers, or all-day comfort, we have something for everyone.
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          Founded by a passionate team of shoe lovers, our mission is to offer a curated collection of high-quality footwear that merges performance with design. We work with top brands and local artisans to bring you exclusive collections and trending styles.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
      >
        <div>
          <h3 className="text-red-400 font-semibold text-xl mb-2">👟 Premium Quality</h3>
          <p className="text-sm text-gray-400">We ensure every product goes through rigorous quality checks so you only get the best.</p>
        </div>
        <div>
          <h3 className="text-red-400 font-semibold text-xl mb-2">🚚 Fast Delivery</h3>
          <p className="text-sm text-gray-400">Get your favorite pairs delivered to your doorstep with our fast and reliable shipping.</p>
        </div>
        <div>
          <h3 className="text-red-400 font-semibold text-xl mb-2">💬 Support 24/7</h3>
          <p className="text-sm text-gray-400">Our team is always here to help you with queries, orders, or anything else you need.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
    