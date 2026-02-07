import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-10 text-sm">Securely sign in to your Cogniflow account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group relative">
              <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 px-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 px-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              New to Cogniflow?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;