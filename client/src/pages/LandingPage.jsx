// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/shoes-poster.webp')` }}>
      <div className="bg-black bg-opacity-60 min-h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to EasyFeet</h1>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-white text-black px-6 py-2 rounded">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-black px-6 py-2 rounded">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
