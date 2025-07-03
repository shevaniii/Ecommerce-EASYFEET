import { useSelector , useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ProductList from './pages/ProductList.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CartPage from './pages/CartPage.jsx';
import { fetchProfile } from './features/users/UsersSlice.js';
import OrderPage from './pages/OrderPage.jsx';
import MyOrders from './pages/MyOrdersPage.jsx'

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/order" element={<OrderPage />} />
        <Route path="/myorders" element={<MyOrders />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
