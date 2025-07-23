import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateCartQuantity, clearCartError } from "../features/Products/CartSlice.js";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  useEffect(() => {
     if (error) {
       const timer = setTimeout(() => {
         dispatch(clearCartError());
       }, 5000);
       return () => clearTimeout(timer);
     }
   }, [error, dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

 const handleQuantityChange = (productId, newQuantity) => {
     if (newQuantity < 1) return;
     dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
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
        {/* Error Display */}
       {error && (
         <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
           {error}
         </div>
       )}
 
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
                   ₹{item.product.price} each
                 </p>
                 <p className="text-red-300 text-sm">
                   Stock: {item.product.countInStock}
                </p>
              </div>
                {/* Quantity Controls */}
               <div className="flex items-center gap-2">
                 <button
                   onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                   className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-white"
                   disabled={item.quantity <= 1}
                 >
                   -
                 </button>
                 <span className="px-4 py-1 bg-black border border-red-500 rounded text-white min-w-[3rem] text-center">
                   {item.quantity}
                 </span>
                 <button
                   onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                   className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-white"
                   disabled={item.quantity >= item.product.countInStock}
                 >
                   +
                 </button>
               </div>
 
               <div className="text-center">
                 <p className="text-white font-semibold">
                   ₹{item.product.price * item.quantity}
                 </p>
                 <button
                   onClick={() => handleRemove(item.product._id)}
                   className="text-sm text-white px-4 py-2 bg-black border border-red-500 rounded hover:bg-red-600 transition mt-2"
                 >
                   Remove
                 </button>
               </div>
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
               disabled={loading}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg border border-red-500 hover:bg-red-700 hover:text-white transition font-semibold"
          >
            {loading ? "Processing..." : "Proceed to Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
