import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Sparkles } from 'lucide-react';
import API from '../../services/api';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10">
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 rounded-full border border-white/10 text-blue-400">
              <Sparkles size={28} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Create Account</h2>
          <p className="text-gray-500 text-center mb-10 text-sm">Start your journey with Cogniflow</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all active:scale-95"
            >
              <UserPlus size={18} />
              <span>Join Now</span>
            </button>
          </form>

          <p className="text-gray-500 mt-8 text-center text-sm">
            Already a member?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;