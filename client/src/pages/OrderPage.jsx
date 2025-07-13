import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/Products/OrderSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { loading, error } = useSelector((state) => state.orders);

  const buyNowData = location.state?.buyNowData || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderInfo = buyNowData
      ? {
          buyNow: true,
          productId: buyNowData.productId,
          quantity: buyNowData.quantity,
          address,
          phone,
        }
      : { address, phone };

    const res = await dispatch(placeOrder(orderInfo));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/myorders");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-6 py-12">
      <div className="bg-red-900 border border-red-500 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          🚚 Shipping Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-red-300">
              Full Address
            </label>
            <input
              type="text"
              placeholder="Enter your complete address"
              className="w-full px-4 py-2 rounded bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-red-300">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 rounded bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>

          {error && <p className="text-red-300 mt-2 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
