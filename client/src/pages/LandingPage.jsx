import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const token = useSelector(
    (state) => state.users.token || localStorage.getItem("token")
  );

  const handleShopNow = () => {
    if (token) {
      navigate("/home");
    } else {
      alert("Please login or signup to continue shopping.");
      navigate("/signup"); // Or navigate("/signup") based on your flow
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
        >
          Step Boldly into <span className="text-red-500">Style</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-10 max-w-xl"
        >
          Discover cutting-edge footwear built for fashion, comfort, and
          performance. Handpicked styles curated just for you.
        </motion.p>

        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg transition">
              Sign Up
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Highlight section */}
      <section className="mt-16 px-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-6 text-center">
          Trending Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 transition"
            >
              <img
                src={`/nike-running-4.jpg`} // replace with your images
                alt="Shoe"
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-bold">Nike Air Max {90 + i}</h3>
              <p className="text-gray-400 mt-2 text-sm">
                High-performance running shoe with futuristic design.
              </p>
              <button
                onClick={handleShopNow}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              >
                Shop Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
