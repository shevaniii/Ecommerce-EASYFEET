import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../features/Products/CartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const product = products.find((p) => p._id === id);

  if (!product) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const handleAddToCart = () => {
    try {
      dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      navigate("/cart");
    } catch (error) {
      console.log("Failed to add to cart", error);
    }
  };

  const handleBuyNow = () => {
    navigate("/order", {
      state: {
        buyNowData: {
          productId: product._id,
          quantity: 1,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-[#1a0000] border border-red-700 rounded-3xl p-8 shadow-lg flex flex-col md:flex-row gap-10 transition-all duration-300">
        
        {/* Image Section */}
        <div className="flex-1">
          <div className="border-4 border-red-600 rounded-xl overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          {/* Optional thumbnails area */}
          <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-none">
            <img src={product.image} alt="thumb" className="h-20 w-20 object-cover rounded-md border border-red-500" />
            <img src={product.image} alt="thumb" className="h-20 w-20 object-cover rounded-md border border-red-500" />
            <img src={product.image} alt="thumb" className="h-20 w-20 object-cover rounded-md border border-red-500" />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-red-400 tracking-wide">{product.name}</h1>
          <p className="text-lg font-semibold">
            Brand: <span className="text-gray-300">{product.brand}</span>
          </p>
          <p className="text-2xl font-bold text-white">₹{product.price}</p>
          <p className="text-sm text-gray-400">Category: {product.category}</p>
          <p className="text-gray-300">{product.description}</p>
          <p>
            Stock:{" "}
            <span
              className={`font-bold ${
                product.countInStock > 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {product.countInStock > 0
                ? `${product.countInStock} Available`
                : "Out of Stock"}
            </span>
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`px-6 py-2 text-white font-semibold rounded-full transition-all ${
                product.countInStock > 0
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold transition-all"
            >
              Buy Now
            </button>
          </div>

          <Link to="/products">
            <button className="mt-8 text-sm border border-red-400 px-4 py-2 rounded-full hover:bg-red-700 transition">
              ← Back to Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
