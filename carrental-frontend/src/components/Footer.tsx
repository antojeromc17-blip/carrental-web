import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080a0f] text-gray-400 border-t border-gray-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/40">
                <i className="fas fa-tachometer-alt text-base"></i>
              </div>
              <span className="text-2xl font-black tracking-wider text-white font-display">
                WAYVER<span className="text-red-600">O</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Premier self-drive and chauffeur-driven automotive rentals across Kerala.
              Explore Fortuner, Innova Crysta, Thar 4x4, Creta, and city compacts with complete peace of mind.
            </p>
            <div className="flex items-center space-x-3 text-gray-400">
              <span className="text-xs text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className="text-xs text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                <i className="fab fa-instagram"></i>
              </span>
              <span className="text-xs text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                <i className="fab fa-x-twitter"></i>
              </span>
              <span className="text-xs text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                <i className="fab fa-youtube"></i>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 border-l-2 border-red-600 pl-2.5">
              Explore Fleet
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/cars" className="hover:text-red-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                  All Available Vehicles
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-red-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                  7-Seater SUVs & MPVs
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-red-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                  Rugged 4x4 Off-Roaders
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-red-500 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                  Budget City Hatchbacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 border-l-2 border-red-600 pl-2.5">
              Our Promise
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <i className="fas fa-shield-alt text-red-600 mt-0.5"></i>
                <span>Sanitized, well-maintained vehicles inspected before every trip.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-user-tie text-red-600 mt-0.5"></i>
                <span>Optional experienced, verified multilingual chauffeurs available.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-rupee-sign text-red-600 mt-0.5"></i>
                <span>100% transparent pricing with zero surprise charges.</span>
              </li>
            </ul>
          </div>

          {/* Project / Academic Information */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 border-l-2 border-red-600 pl-2.5">
              Project Context
            </h4>
            <div className="bg-[#111622] border border-gray-800 p-3.5 rounded text-xs space-y-2">
              <p className="text-gray-300 font-medium">
                Car Rental Management System
              </p>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Full-Stack Architecture: React 19 + TypeScript + Vite + Tailwind CSS integrated with Spring Boot 4 & MySQL.
              </p>
              <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex justify-between">
                <span>Designed with Google Stitch</span>
                <span className="text-emerald-400 font-semibold">B.Tech CSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} Wayvero Motors. Academic Portfolio Project.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link to="/cars" className="hover:text-white transition-colors">Fleet Directory</Link>
            <Link to="/login" className="hover:text-white transition-colors">Customer Portal</Link>
            <span className="text-gray-400">Kerala, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

