import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../features/Products/CartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    navigate("/order");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
        <h2 className="text-3xl font-bold mb-4">🛒 Your Cart is Empty</h2>
        <a
          href="/products"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Go back to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10 tracking-wider">
        Your Shopping Cart 🛍️
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-4 bg-red-900 rounded-xl p-4 border border-red-500 shadow-lg"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-red-700"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-red-300">
                  {item.product.name}
                </h3>
                <p className="text-white font-medium">
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-sm text-white px-4 py-2 bg-black border border-red-500 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="lg:w-1/3 bg-red-800 p-6 rounded-xl border border-red-500 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Order Summary
          </h2>
          <div className="space-y-3 text-white">
            <p className="flex justify-between">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="flex justify-between">
              <span>Total Price:</span>
              <span className="font-bold text-red-300">₹{totalPrice}</span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg border border-red-500 hover:bg-red-700 hover:text-white transition font-semibold"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
