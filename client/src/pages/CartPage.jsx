import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../features/Products/CartSlice';
import { placeOrder } from '../features/Products/OrderSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!items.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <a href="/products" className="text-blue-500 underline">Go back to shop</a>
      </div>
    );
  }
    const handleCheckout=()=>{
        navigate('/order');
    }
  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-2/3 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex gap-4 items-center">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>₹{item.product.price} x {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.product._id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p className="mb-2">Items: {totalItems}</p>
        <p className="mb-4 font-semibold">Total: ₹{totalPrice}</p>
        <button 
        onClick={handleCheckout}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
