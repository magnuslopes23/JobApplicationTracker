import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser, user } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register with:', { name, email, password });
    const userData = {
       name,email,password
    }
    try{
        await registerUser(userData)
    }catch (err){
        console.log(err)
    }
  };

  if(user){
    return <Navigate to='/'/>
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full mb-4 px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
