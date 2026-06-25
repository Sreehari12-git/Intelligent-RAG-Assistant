import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login({ onSuccess, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      if (onSuccess) {
        onSuccess(data);
      } else if (data.role === "ADMIN") {
        navigate('/admin');
      } else {
        navigate("/chat");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[#13111F] border border-[#2A2550]/60 w-full max-w-md rounded-2xl shadow-2xl p-8 overflow-hidden">

      <div
        className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#6B6A8A] hover:text-[#E8E6FF] hover:bg-[#2A2550]/60 transition-all duration-150 text-lg leading-none z-10"
        >
          &times;
        </button>
      )}

      <div className="mb-7 relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/20 border border-[#6C5CE7]/40 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#6B6A8A]">Gnapi Assistant</span>
        </div>
        <h2 className="text-2xl font-bold text-[#E8E6FF] leading-tight mb-1">Welcome back</h2>
        <p className="text-sm text-[#6B6A8A]">Sign in to continue to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wide uppercase text-[#8B82C4]">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0C0B18] border border-[#2A2550] rounded-xl px-4 py-3 text-sm text-[#D8D5F5] placeholder-[#3D3860] focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7]/70 transition-all duration-200 hover:border-[#3D3860]"
            required
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold tracking-wide uppercase text-[#8B82C4]">Password</label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0C0B18] border border-[#2A2550] rounded-xl px-4 py-3 text-sm text-[#D8D5F5] placeholder-[#3D3860] focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7]/70 transition-all duration-200 hover:border-[#3D3860] pr-16"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8B82C4] hover:text-[#E8E6FF] transition-colors duration-150 px-1 py-0.5 rounded"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 text-sm bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative overflow-hidden bg-[#6C5CE7] hover:bg-[#5A4DD4] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#6C5CE7]/20 hover:shadow-[#6C5CE7]/40 active:scale-[0.98] mt-1"
          style={{ marginTop: '20px' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </button>

      </form>
    </div>
  );
}

export default Login;