import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/users/UsersSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ Correct: Match the names defined in your userSlice
  const { status, error, isAuthenticated } = useSelector((state) => state.users);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  // ✅ Automatically redirect if login is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
