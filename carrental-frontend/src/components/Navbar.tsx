import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-semibold tracking-wider uppercase transition-colors px-3 py-1.5 rounded ${
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#0b0e14] text-gray-400 text-xs py-2 border-b border-gray-800 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-300">
              <i className="far fa-envelope text-red-500 mr-1.5 text-xs"></i>
              support@wayvero.rentals
            </span>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <span className="flex items-center text-gray-300">
              <i className="fas fa-phone-alt text-red-500 mr-1.5 text-xs"></i>
              +91 98470 12345
            </span>
            <span className="text-gray-700 hidden md:inline">|</span>
            <span className="hidden md:flex items-center text-gray-400">
              <i className="fas fa-map-marker-alt text-red-500 mr-1.5 text-xs"></i>
              Kochi Bolgatty Wharf, Kerala
            </span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Fleet Active
            </span>
            <span className="hidden sm:inline text-gray-500">• 10 Verified Vehicles</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="bg-white/95 sticky top-0 z-50 border-b border-gray-200/90 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 flex justify-between items-center h-16 sm:h-20">
          {/* Brand Logo matching Stitch */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/30 group-hover:scale-105 transition-transform duration-200">
              <i className="fas fa-tachometer-alt text-base"></i>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-wider text-slate-900 font-display">
                WAYVER<span className="text-red-600">O</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600 tracking-widest font-mono">
                KL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/cars" className={navLinkClasses}>
              Browse Fleet
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/bookings" className={navLinkClasses}>
                My Bookings
              </NavLink>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/bookings"
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded border border-slate-200 text-xs font-semibold transition-colors"
                >
                  <i className="far fa-user text-red-600"></i>
                  <span>{user.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-1 rounded border border-slate-200">
                    #{user.id}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-red-600 px-2.5 py-1.5 rounded hover:bg-slate-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 px-3 py-2 rounded transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-sm shadow-red-900/20 hover:-translate-y-0.5"
                >
                  <span>Register</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-700 hover:text-slate-900 p-2 text-xl focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-150">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClasses}
              >
                Home
              </NavLink>
              <NavLink
                to="/cars"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClasses}
              >
                Browse Fleet
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClasses}
                >
                  My Bookings
                </NavLink>
              )}
            </nav>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="text-xs text-slate-700 font-semibold flex items-center gap-2 py-1">
                    <i className="far fa-user text-red-600"></i>
                    Signed in as <strong className="text-slate-900">{user.name}</strong>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 py-2.5 rounded shadow"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
