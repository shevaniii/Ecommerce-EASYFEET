import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/Products/OrderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center">
        🧾 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-300">No orders placed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-600"
                      : order.status === "Shipped"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Product Thumbnails */}
              <div className="flex gap-2 overflow-x-auto mb-3">
                {order.items.slice(0, 3).map((item) => (
                  <img
                    key={item.product._id}
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded border border-red-500"
                  />
                ))}
                {order.items.length > 3 && (
                  <span className="text-xs text-gray-300 self-center ml-2">
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>

              {/* Order Summary */}
              <div className="mt-4 space-y-2">
                <p className="text-white font-semibold">
                  Total: ₹{order.totalprice}
                </p>
                <p className="text-sm text-gray-300">
                  Items:{" "}
                  {order.items
                    .map((item) => `${item.product.name} × ${item.quantity}`)
                    .join(", ")}
                </p>
              </div>

              {/* Actions (optional) */}
              {/* <div className="mt-4 flex justify-between text-sm text-red-300">
                <button className="hover:underline">Track Order</button>
                <button className="hover:underline">View Invoice</button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
