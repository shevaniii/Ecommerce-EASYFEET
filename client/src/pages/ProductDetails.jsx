import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../features/Products/CartSlice";
import { placeOrder } from "../features/Products/OrderSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, state } = useSelector((state) => state.products);
  const product = products.find((p) => p._id == id);

  if (!product) {
    return <div>loading...</div>;
  }
  
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
  const handleAddToCart = () => {
    try {
      dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      navigate("/cart");
    } catch (error) {
      console.log("failed to add product in the cart", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-red-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-xl border-4 border-red-500"
          />

          {/* Product Details */}
          <div className="text-center md:text-left space-y-4 md:w-1/2">
            <h1 className="text-4xl font-bold text-red-400">{product.name}</h1>
            <p className="text-xl text-white font-semibold">
              Brand: <span className="text-gray-300">{product.brand}</span>
            </p>
            <p className="text-xl font-semibold text-white">₹{product.price}</p>
            <p className="text-sm text-gray-300">
              Category: {product.category}
            </p>
            <p className="text-gray-200">{product.description}</p>
            <p className="text-md">
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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`mt-4 px-6 py-2 rounded-full font-semibold transition-all ${
                product.countInStock > 0
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            {/* Add to Buy Button */}
            <button
              onClick={handleBuyNow}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Buy Now
            </button>
            {/* Back Link */}
            <div>
              <Link to="/products">
                <button className="mt-6 px-6 py-2 border border-red-400 rounded-full text-white hover:bg-red-600">
                  ← Back to Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
