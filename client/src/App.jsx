import { useSelector , useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
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
import AboutPage from './pages/AboutPage.jsx';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" />} />
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/home" />} />
            <Route path="/home" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/order" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderPage />
              </ProtectedRoute>
            } />
            <Route path="/myorders" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<AboutPage />} />
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                  <p className="text-xl mb-6">Page not found</p>
                  <a href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
