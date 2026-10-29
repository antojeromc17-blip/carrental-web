import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerCustomer } from '../api';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password match status
  const isMatch = password && confirmPassword ? password === confirmPassword : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreedTerms) {
      setErrorMessage('Please accept the rental terms to proceed.');
      return;
    }

    setLoading(true);
    try {
      const response = await registerCustomer({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      setSuccessMessage(
        `Registration complete! Welcome, ${response.name}. Redirecting to sign in...`
      );

      setTimeout(() => {
        navigate('/login', {
          state: { registeredEmail: email.trim().toLowerCase() },
        });
      }, 1500);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 lg:py-16 px-4 lg:px-12 text-[#0f172a]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Endpoint Specification Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-sm">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-red-50 text-red-700 font-mono font-bold px-2.5 py-0.5 rounded border border-red-200 text-[11px]">
              POST /api/customers/register
            </span>
            <span className="text-slate-500 font-mono">Content-Type: application/json</span>
          </div>
          <div className="text-slate-600">
            Already registered?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-bold ml-1">
              Sign In →
            </Link>
          </div>
        </div>

        {/* Main Grid: Form on Left, API Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full pointer-events-none border-b border-l border-red-100/50" />

            <div className="space-y-2 mb-6">
              <span className="text-xs text-red-600 font-bold uppercase tracking-widest block font-display">
                Patron Onboarding
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-display uppercase tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                Join Kerala's premier car rental service. Instant account provisioning with encrypted credential protection.
              </p>
            </div>

            {/* Error Alert Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start justify-between gap-3 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <i className="fas fa-exclamation-circle text-red-600 text-sm mt-0.5" />
                  <div>
                    <strong className="block font-bold text-red-900 uppercase text-[11px] font-display">
                      Registration Error
                    </strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            )}

            {/* Success Alert Banner */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                <i className="fas fa-check-circle text-emerald-600 text-sm" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Legal Name */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Full Legal Name
                </label>
                <div className="relative">
                  <i className="far fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Nair"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Email Address
                </label>
                <div className="relative">
                  <i className="far fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.nair@example.com"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Min 6 characters
                  </span>
                </div>
                <div className="relative">
                  <i className="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors font-mono shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                  >
                    <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Confirm Password
                  </label>
                  {confirmPassword && (
                    <span
                      className={`text-[10px] font-mono font-bold ${isMatch ? 'text-emerald-700' : 'text-red-600'
                        }`}
                    >
                      {isMatch ? 'MATCH CONFIRMED' : 'MISMATCH DETECTED'}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <i className="fas fa-shield-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full bg-white border rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors font-mono shadow-2xs ${confirmPassword && !isMatch
                        ? 'border-red-500'
                        : 'border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                      }`}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2 text-left">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-white border-slate-300 text-red-600 focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I agree to the rental terms, valid driving license requirement at handover, and transparent pricing policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner animate-spin text-xs" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <i className="fas fa-arrow-right text-[10px]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-bold ml-1">
                Log in here
              </Link>
            </div>
          </div>

          {/* Right Architecture & API Inspector Panel (Stitch Inspired) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Live Payload Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-code text-red-600" />
                  <span>Request Payload Preview</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 font-semibold">JSON (UTF-8)</span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-100">
                <pre className="whitespace-pre-wrap break-all text-emerald-400">
                  {JSON.stringify(
                    {
                      name: name || 'Rahul Nair',
                      email: email || 'rahul.nair@example.com',
                      password: password ? '••••••••••••' : '••••••••••••',
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <i className="fas fa-shield-alt text-emerald-600 mt-0.5 text-xs" />
                  <p>
                    <strong className="text-slate-900">BCrypt Hashing:</strong> The password string is never stored in plain text. Spring Boot hashes it using <code className="text-red-600">BCryptPasswordEncoder</code> before storing it in MySQL.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-emerald-600 mt-0.5 text-xs" />
                  <p>
                    <strong className="text-slate-900">Response Sanitization:</strong> The API returns only <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono">{'{ id, name, email }'}</code>, ensuring the password is omitted from the network response.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Feature Perks */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">
                Patron Membership Privileges
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <i className="fas fa-bolt text-red-600 text-[10px]" />
                  <span>Instant car reservation across all 10 fleet vehicles</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-history text-red-600 text-[10px]" />
                  <span>Real-time tracking of active and returned bookings</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-key text-red-600 text-[10px]" />
                  <span>Doorstep car delivery and CIAL airport terminal pickup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
