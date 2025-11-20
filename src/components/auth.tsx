import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type AuthProps = {
  onNavigate: (page: string) => void;
};

export const Auth = ({ onNavigate }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        onNavigate('dashboard');
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
        onNavigate('dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-[500px] mx-auto my-10 px-5">
      <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.03]">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              isLogin
                ? 'bg-gradient-to-r from-[#56ccf2] to-[#7b61ff] text-gray-900'
                : 'bg-transparent border border-white/10 text-white/60'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              !isLogin
                ? 'bg-gradient-to-r from-[#56ccf2] to-[#7b61ff] text-gray-900'
                : 'bg-transparent border border-white/10 text-white/60'
            }`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-3">{isLogin ? 'Login' : 'Create Account'}</h2>
        <p className="text-white/60 mb-5">
          {isLogin ? 'Access your account.' : 'Signup to get started.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-white/70 font-bold mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
                required={!isLogin}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-white/70 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white/70 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#56ccf2] to-[#7b61ff] text-gray-900 px-5 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </section>
  );
};
