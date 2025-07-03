import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/Products/OrderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
  dispatch(fetchOrders()).then((res) => {
    console.log("Fetched orders:", res);
  });
}, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-4 p-4 border rounded shadow">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Total: ₹{order.totalprice}</p>
            <ul className="ml-4 mt-2 list-disc">
              {order.items.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
