import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/UsersSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.token || localStorage.getItem("token"));

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-red-600 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-red-600 tracking-widest hover:text-white transition duration-300"
        >
          EasyFEET
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-red-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-300 hover:text-red-500 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-red-500 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/cart"
            className="text-gray-300 hover:text-red-500 transition duration-300"
          >
            🛒 Cart
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-red-500 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-red-500 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
