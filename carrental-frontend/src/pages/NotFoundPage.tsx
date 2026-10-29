import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#f8f9fa] text-slate-800">
      <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center text-3xl mb-6 shadow-sm">
        <i className="fas fa-compass text-3xl"></i>
      </div>
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 mb-2">
        HTTP 404 • Route Undefined
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase tracking-wide mb-3">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-8 font-body">
        The destination you are trying to reach does not exist in our route gateway or has been relocated to another terminal.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
        >
          <i className="fas fa-home text-xs"></i>
          <span>Return to Home</span>
        </Link>
        <Link
          to="/cars"
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
        >
          <i className="fas fa-car text-xs"></i>
          <span>Browse Fleet</span>
        </Link>
      </div>
    </div>
  );
};
