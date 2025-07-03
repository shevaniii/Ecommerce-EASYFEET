// src/pages/OrderPage.jsx
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
      ? { buyNow: true, productId: buyNowData.productId, quantity: buyNowData.quantity , address , phone }
      : {address , phone };

    const res = await dispatch(placeOrder(orderInfo));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/myorders");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Address"
          className="w-full border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default OrderPage;
