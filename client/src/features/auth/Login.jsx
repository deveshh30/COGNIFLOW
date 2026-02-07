import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Antigravity from '../../components/ui/Bg.particle'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const response = await login(email, password);
      if (response?.data?.token) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.message || 'Login failed. Please try again.');
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10 relative">
        <div className="absolute -inset-6 bg-blue-600/10 blur-3xl rounded-[2.5rem]" />
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/25 via-white/10 to-transparent shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 rounded-3xl ring-1 ring-white/10 transition-all hover:border-white/30">
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
              className="w-full bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-300 ease-out hover:bg-[#020ca2] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(2,12,162,0.35)] active:opacity-95"
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
            {errorMessage && (
              <p className="text-sm text-red-400 text-center pt-2">
                {errorMessage}
              </p>
            )}
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
    </div>
  );
};

export default Login;