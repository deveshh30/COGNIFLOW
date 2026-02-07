import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Sparkles } from 'lucide-react';
import Antigravity from '../../components/ui/Bg.particle'
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      await login(formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed.";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Antigravity
          count={200}
          magnetRadius={5}
          ringRadius={5}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={0.7}
          lerpSpeed={0.05}
          color="#020ca2"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0.2}
          depthFactor={1.4}
          pulseSpeed={3.5}
          particleShape="capsule"
          fieldStrength={11.3}
        />
      </div>
      {/* Background Accent Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10 relative">
        <div className="absolute -inset-6 bg-blue-600/10 blur-3xl rounded-[2.5rem]" />
        <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-white/25 via-white/10 to-transparent shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 rounded-[2rem] ring-1 ring-white/10 transition-all hover:border-white/30">
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
              className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 flex items-center justify-center space-x-2 transition-colors duration-300 ease-out hover:bg-[#020ca2] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(2,12,162,0.35)] active:opacity-95"
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
    </div>
  );
};

export default SignUp;