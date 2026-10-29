import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../types';
import { getCarPresentation } from '../utils/carMetadata';

interface CarCardProps {
  car: Car;
}

const FALLBACK_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNFxxZ4do_XEG_mvGtksoRwFwlpWch0p2zxGU_kr4c60znsti0zs5HnLdn0aWJBNajZwsnLzi1rCG7fvSgzVe58XTCwjWr7qDBWcDWqYf2dGz_y213YNuJX_PkTWtUbXcE_aiWjK0GHDa6Cu4PecC1V4qT9137qmUMlD1N8ehcVVYKq03iHvkLwrGHjoe-M8XBb2C8V4Jl5Dp3Diho3ZNhaZJCzJHGzR5WkdgfS8';

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const meta = getCarPresentation(car);

  return (
    <article
      className={`flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group hover:border-gray-300 hover:shadow-lg ${
        !car.available ? 'opacity-90 grayscale-[25%]' : 'hover:-translate-y-1'
      }`}
    >
      {/* Top Image Section */}
      <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
        <img
          src={meta.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE;
            }
          }}
        />
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

        {/* Top Badges: Registration & Category */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 font-bold tracking-wider">
            {car.registrationNumber}
          </span>
          <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
            {meta.category}
          </span>
        </div>

        {/* Top Right: Real-time Availability Badge */}
        <div className="absolute top-3 right-3">
          {car.available ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/95 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/85 backdrop-blur-md text-slate-200 text-[11px] font-semibold border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Booked
            </span>
          )}
        </div>

        {/* Bottom Image Overlay: Brand, Model & Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 block">
              {car.brand}
            </span>
            <h3 className="text-xl font-bold text-white font-headline leading-tight drop-shadow-sm">
              {car.model}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-white font-headline">
              ₹{car.pricePerDay.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block -mt-0.5">
              per day
            </span>
          </div>
        </div>
      </div>

      {/* Card Body & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3.5 bg-white">
        {/* Specs Strip */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded text-center">
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">
              Capacity
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono">{meta.seats}</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">
              Gearbox
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono">{meta.transmission}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">
              Fuel
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono">{meta.fuel}</span>
          </div>
        </div>

        {/* Driver Option Strip */}
        <div className="flex items-center justify-between p-2 rounded text-xs bg-emerald-50/70 border border-emerald-100">
          {car.driverAvailable ? (
            <>
              <div className="flex items-center gap-1.5 text-emerald-950 font-semibold">
                <i className="fas fa-user-tie text-emerald-600 text-xs" />
                <span>Driver Available</span>
              </div>
              <span className="text-emerald-800 font-mono text-[11px] font-medium">
                +₹{car.driverChargePerDay.toLocaleString('en-IN')} / day
              </span>
            </>
          ) : (
            <div className="flex items-center justify-between w-full bg-slate-100 border border-slate-200 p-1 -m-1 rounded">
              <div className="flex items-center gap-1.5 text-slate-700">
                <i className="fas fa-id-card text-xs text-slate-500" />
                <span>Self-Drive Only</span>
              </div>
              <span className="text-slate-500 text-[10px] uppercase font-mono">
                Driver N/A
              </span>
            </div>
          )}
        </div>

        {/* Action Button: Book Now vs Disabled Not Available */}
        <div className="pt-1">
          {car.available ? (
            <Link
              to={`/book/${car.id}`}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <span>Reserve {car.model}</span>
              <i className="fas fa-arrow-right text-[10px]" />
            </Link>
          ) : (
            <button
              disabled
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 border border-slate-200 rounded text-xs font-bold uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i className="fas fa-lock text-[10px]" />
              <span>Unavailable (Booked)</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
