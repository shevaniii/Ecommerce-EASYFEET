import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/users/UsersSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated } = useSelector((state) => state.users);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0f0f] via-black to-[#0f0f0f] text-white">
      <div className="bg-[#1a1a1a] shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md border border-red-600">
        <h2 className="text-3xl font-bold text-red-500 text-center mb-6">Login to EasyFEET</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-white text-black border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
           className="w-full bg-white text-black border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2 font-semibold bg-red-500 text-black rounded hover:bg-red-600 transition"
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
