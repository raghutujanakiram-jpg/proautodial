import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, password: string, role: 'agent' | 'admin') => boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onClose, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'agent' | 'admin'>('agent');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = onLogin(email, password, role);
    if (!success) {
      setError('Invalid credentials. Try agent@proautodial.com / demo123');
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (demoRole: 'agent' | 'admin') => {
    const demoEmail = demoRole === 'admin' ? 'admin@proautodial.com' : 'agent@proautodial.com';
    setEmail(demoEmail);
    setPassword('demo123');
    setRole(demoRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-50"
      >
        <i className="fas fa-times text-xl"></i>
      </button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="ProAutoDial" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to access your call center dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Role Selector */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-800/50 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('agent')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                role === 'agent'
                  ? 'bg-brand text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fas fa-headset mr-2"></i>
              Agent
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                role === 'admin'
                  ? 'bg-brand text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fas fa-shield-halved mr-2"></i>
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                Remember me
              </label>
              <button type="button" className="text-brand hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand hover:bg-brand/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-right-to-bracket"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center mb-4 uppercase tracking-wider font-bold">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('agent')}
                className="py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-bold transition-all"
              >
                <i className="fas fa-headset mr-2"></i>
                Agent Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-3 px-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl text-purple-400 text-sm font-bold transition-all"
              >
                <i className="fas fa-user-shield mr-2"></i>
                Admin Demo
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Powered by <span className="text-brand font-bold">ProAutoDial</span> AI Suite
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
