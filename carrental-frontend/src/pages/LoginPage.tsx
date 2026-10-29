import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginCustomer } from '../api';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  // Check if routed after registration or redirected from a protected route
  const stateFrom = (location.state as any)?.from?.pathname;
  const registeredEmail = (location.state as any)?.registeredEmail || '';

  const [email, setEmail] = useState(registeredEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const customer = await loginCustomer({
        email: email.trim().toLowerCase(),
        password,
      });

      // Save customer details in AuthContext & localStorage (id, name, email - never password)
      login(customer);

      // Redirect to the originally requested page (e.g. /book/1) or fallback to /cars
      const destination = stateFrom || '/cars';
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Invalid email or password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePreFillDemo = () => {
    setEmail('rahul.nair@example.com');
    setPassword('KochiRental123!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 lg:py-16 px-4 lg:px-12 text-[#0f172a]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Redirect Notice if coming from protected booking attempt */}
        {stateFrom && (
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 text-xs flex items-center gap-2.5 animate-in fade-in shadow-2xs">
            <i className="fas fa-info-circle text-amber-600 text-sm" />
            <span>
              Authentication required. Please sign in to finalize your car reservation.
            </span>
          </div>
        )}

        {/* Top Endpoint Specification Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-sm">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-red-50 text-red-700 font-mono font-bold px-2.5 py-0.5 rounded border border-red-200 text-[11px]">
              POST /api/customers/login
            </span>
            <span className="text-slate-500 font-mono">Payload: {'{ email, password }'}</span>
          </div>
          <div className="text-slate-600">
            Need an account?{' '}
            <Link to="/register" className="text-red-600 hover:text-red-700 font-bold ml-1">
              Register Here →
            </Link>
          </div>
        </div>

        {/* Main Grid: Form on Left, Session Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sign In Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full pointer-events-none border-b border-l border-red-100/50" />

            <div className="space-y-2 mb-6">
              <span className="text-xs text-red-600 font-bold uppercase tracking-widest block font-display">
                Terminal Access
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-display uppercase tracking-tight">
                Customer Sign In
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sign in with your registered email and password to access vehicle bookings and fleet returns.
              </p>
            </div>

            {/* Quick Demo Pre-fill Box */}
            <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-800">Testing as Examiner/Viva?</span>
                <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">(rahul.nair@example.com)</span>
              </div>
              <button
                type="button"
                onClick={handlePreFillDemo}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <i className="fas fa-magic text-[10px] text-red-600" />
                <span>Pre-fill Sample Data</span>
              </button>
            </div>

            {/* Error Alert Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start justify-between gap-3 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <i className="fas fa-exclamation-circle text-red-600 text-sm mt-0.5" />
                  <div>
                    <strong className="block font-bold text-red-900 uppercase text-[11px] font-display">
                      Authentication Failed
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
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
                    placeholder="name@domain.com"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
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
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Authenticate &amp; Sign In</span>
                      <i className="fas fa-arrow-right text-[10px]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              New client?{' '}
              <Link to="/register" className="text-red-600 hover:text-red-700 font-bold ml-1">
                Create an account
              </Link>
            </div>
          </div>

          {/* Right Session Storage & Academic Inspector */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Session Inspector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-database text-red-600" />
                  <span>Client Session Snapshot</span>
                </div>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold border ${user ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {user ? 'ACTIVE' : 'GUEST'}
                </span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-[11px] space-y-2 text-slate-100">
                <div className="text-slate-400">// localStorage state:</div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">customerId:</span>
                  <span className="text-emerald-400 font-bold">
                    {user ? user.id : 'null'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">customerName:</span>
                  <span className="text-slate-200 font-semibold">
                    {user ? `"${user.name}"` : 'null'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">customerEmail:</span>
                  <span className="text-slate-200">
                    {user ? `"${user.email}"` : 'null'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px] pt-1">
                  <span>password:</span>
                  <span className="text-red-400 font-bold">NEVER STORED</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 pt-1">
                <div className="flex items-start gap-2">
                  <i className="fas fa-lock text-emerald-600 mt-0.5 text-xs" />
                  <p>
                    <strong className="text-slate-900">BCrypt Authentication:</strong> When you submit this form, Spring Boot's <code className="text-red-600">CustomerService</code> verifies your password using <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">passwordEncoder.matches()</code>.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fas fa-info-circle text-amber-500 mt-0.5 text-xs" />
                  <p>
                    <strong className="text-slate-900">Academic Scope:</strong> User identity is preserved locally via <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">AuthContext</code> to bind future bookings to your customer ID without token forgery.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Architecture Note */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl text-xs text-slate-600 space-y-2 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block font-display">
                Academic Project Clarification
              </span>
              <p className="text-[11px] leading-relaxed">
                This project implements sessionless authentication. No JWT signature verification or HTTP-only cookies are claimed. The returned customer ID is authoritative for rental reservations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
