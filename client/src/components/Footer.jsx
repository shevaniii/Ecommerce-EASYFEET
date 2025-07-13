import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0e0e0e] text-white pt-10 pb-6 mt-5 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-red-500 pb-8">
        <div>
          <h2 className="text-lg font-bold text-red-500 mb-4">Shop</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 transition cursor-pointer">Men</li>
            <li className="hover:text-red-400 transition cursor-pointer">Women</li>
            <li className="hover:text-red-400 transition cursor-pointer">Kids</li>
            <li className="hover:text-red-400 transition cursor-pointer">New Arrivals</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-red-500 mb-4">Company</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 transition cursor-pointer">About Us</li>
            <li className="hover:text-red-400 transition cursor-pointer">Careers</li>
            <li className="hover:text-red-400 transition cursor-pointer">Blog</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-red-500 mb-4">Support</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 transition cursor-pointer">Contact Us</li>
            <li className="hover:text-red-400 transition cursor-pointer">FAQs</li>
            <li className="hover:text-red-400 transition cursor-pointer">Shipping</li>
            <li className="hover:text-red-400 transition cursor-pointer">Returns</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-red-500 mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-red-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-red-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-red-400 transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs mt-6 text-gray-500">
        &copy; {new Date().getFullYear()} EasyFEET Co. All rights reserved. (Shivani Giri)
      </p>
    </footer>
  )
};

export default Footer;
