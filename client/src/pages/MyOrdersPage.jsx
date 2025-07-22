import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, clearOrderError } from "../features/Products/OrderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearOrderError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-10 flex justify-center items-center">
        <p className="text-xl">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center">
        🧾 Your Orders
      </h1>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {!orders || orders.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-300 text-xl mb-6">No orders placed yet.</p>
          <a
            href="/products"
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-red-900 rounded-xl p-6 shadow-xl border border-red-600 hover:shadow-2xl transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-300">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-600 text-white"
                      : order.status === "Shipped"
                      ? "bg-yellow-600 text-black"
                      : order.status === "Cancelled"
                      ? "bg-gray-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Product Thumbnails */}
              <div className="flex gap-2 overflow-x-auto mb-4">
                {order.items.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={item.product?.image || '/placeholder-image.jpg'}
                      alt={item.product?.name || 'Product'}
                      className="w-16 h-16 object-cover rounded border border-red-500"
                    />
                    <p className="text-xs text-center text-gray-300 mt-1">
                      ×{item.quantity}
                    </p>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded border border-red-500 text-xs text-gray-300">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <p className="text-white font-semibold text-lg">
                  Total: ₹{order.totalPrice}
                </p>
                <p className="text-sm text-gray-300">
                  Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                {order.shippingAddress && (
                  <p className="text-xs text-gray-400 truncate">
                    📍 {order.shippingAddress}
                  </p>
                )}
                {order.phoneNumber && (
                  <p className="text-xs text-gray-400">
                    📞 {order.phoneNumber}
                  </p>
                )}
              </div>

              {/* Product Details */}
              <div className="mt-4 pt-4 border-t border-red-700">
                <p className="text-xs text-gray-300 mb-2">Products:</p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-xs text-gray-400">
                      • {item.product?.name || 'Unknown Product'} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                {order.status === 'Pending' && (
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white transition">
                    Track Order
                  </button>
                )}
                <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
