import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import API from '../services/Api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login , user} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login with:', email, password);
    try{
        await login({email, password})
    }catch (e){
        console.log(e)
    }
    // TODO: Call backend API here
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mb-6 px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
