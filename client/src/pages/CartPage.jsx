// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateQuantity } from "../redux/cartSlice";
// import { Link } from "react-router-dom";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleQuantityChange = (id, quantity) => {
//     if (quantity >= 1) {
//       dispatch(updateQuantity({ id, quantity }));
//     }
//   };

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6">
//         <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
//         <Link to="/" className="text-blue-600 underline hover:text-blue-800">
//           Go back to shop
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Cart Items */}
//         <div className="md:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 rounded-lg shadow-md flex items-center"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />
//               <div className="ml-4 flex-1">
//                 <h2 className="text-xl font-semibold">{item.name}</h2>
//                 <p className="text-gray-600">₹{item.price}</p>
//                 <div className="flex items-center mt-2 space-x-2">
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(item.id, item.quantity - 1)
//                     }
//                     className="px-2 py-1 bg-gray-300 rounded"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(item.id, item.quantity + 1)
//                     }
//                     className="px-2 py-1 bg-gray-300 rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleRemove(item.id)}
//                 className="ml-4 text-red-500 hover:text-red-700 font-semibold"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Summary Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <p className="mb-2">Items: {cartItems.length}</p>
//           <p className="mb-4 font-semibold">Total: ₹{totalPrice}</p>
//           <button className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
