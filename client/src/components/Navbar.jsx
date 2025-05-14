// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { logout } from "../features/users/UsersSlice";
import {useDispatch , useSelector} from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=> state.users.token || localStorage.getItem('token'))
  const handlelogout =()=>{
    alert("are you sure you want to logout!!")
      dispatch(logout());
    navigate('/');
  }
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
          <Link to="/cart" className="hover:text-red-500 transition">🛒Cart</Link>
          {token &&
           ( <button onClick={handlelogout} className="hover:text-red-500 transition">LOGOUT</button>)}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
