import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../api';
import type { Car } from '../types';
import { CarCard } from '../components/CarCard';
import { getCarPresentation } from '../utils/carMetadata';

const LAMBORGHINI_HERO_IMAGE =
  'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2400&q=85';

const LAMBORGHINI_FALLBACK =
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2400&q=85';

export const Home: React.FC = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(4500);

  // Fetch live fleet from MySQL backend
  useEffect(() => {
    let isMounted = true;
    async function loadFleet() {
      try {
        setLoadingCars(true);
        const data = await fetchCars();
        if (!isMounted) return;
        setAllCars(data);
      } catch {
        // Fallback gracefully
      } finally {
        if (isMounted) setLoadingCars(false);
      }
    }
    loadFleet();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter cars for the Featured section based on Stitch category tabs and slider
  const displayedCars = useMemo(() => {
    let filtered = [...allCars];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => {
        const meta = getCarPresentation(c);
        return meta.category.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }
    filtered = filtered.filter((c) => c.pricePerDay <= maxPrice);
    return filtered;
  }, [allCars, selectedCategory, maxPrice]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-slate-800">
      {/* 1. HERO SECTION WITH ULTRA HD LAMBORGHINI CENTERPIECE */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-black overflow-hidden">
        {/* Cinematic Ultra-HD Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={LAMBORGHINI_HERO_IMAGE}
            alt="Lamborghini Exotic Supercar"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== LAMBORGHINI_FALLBACK) {
                target.src = LAMBORGHINI_FALLBACK;
              }
            }}
          />
          {/* Multi-layered cinematic shadows for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-black/70" />
        </div>

        {/* Ambient Telemetry Glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Content with generous vertical breathing room */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-16 pb-28 lg:pt-20 lg:pb-36">
          <div className="max-w-2xl text-left space-y-5">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-700/60 text-red-400 px-3.5 py-1.5 text-xs uppercase tracking-widest font-mono font-semibold rounded-full shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>WAYVERO ELITE FLEET • KERALA LUXURY CAR RENTALS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none font-display drop-shadow-lg">
              EXPERIENCE THE <br />
              <span className="text-red-500">ULTIMATE DRIVE.</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-body max-w-xl">
              Kerala&apos;s premier rental concierge. From high-performance exotics to rugged terrain explorers and executive cruisers, enjoy transparent daily pricing, verified fleet availability, and 24/7 dedicated support.
            </p>

            {/* Specs Bar with reliable FontAwesome icons */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-mono">
              <span className="bg-black/70 border border-gray-700/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-gray-200">
                <i className="fas fa-tachometer-alt text-red-500 text-xs" />
                <span>0-100 km/h in 2.9s</span>
              </span>
              <span className="bg-black/70 border border-gray-700/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-gray-200">
                <i className="fas fa-shield-alt text-red-500 text-xs" />
                <span>All-Wheel Drive</span>
              </span>
              <span className="bg-black/70 border border-gray-700/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-gray-200">
                <i className="fas fa-gas-pump text-red-500 text-xs" />
                <span>V10 Supercar Engine</span>
              </span>
              <span className="bg-black/70 border border-gray-700/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-gray-200">
                <i className="fas fa-map-marker-alt text-red-500 text-xs" />
                <span>Doorstep Delivery</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-xl shadow-red-900/50 hover:-translate-y-0.5"
              >
                <span>Explore Full Fleet</span>
                <i className="fas fa-arrow-right text-xs" />
              </Link>

              <a
                href="#featured"
                className="text-xs text-gray-300 hover:text-white font-mono uppercase tracking-wider bg-[#141a26]/90 hover:bg-[#1a2333] px-6 py-3.5 rounded-lg border border-gray-700/80 transition-colors shadow-lg"
              >
                10 Verified Cars • Zero Hidden Fees
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STITCH BOOKING SEARCH OVERLAY BANNER */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 w-full">
        <div className="bg-[#121722] rounded-xl shadow-2xl p-6 lg:p-8 border border-gray-700/60 text-white backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Field 1: Pick Up Location */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Pick-Up Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                  <i className="fas fa-map-marker-alt text-xs" />
                </span>
                <input
                  type="text"
                  readOnly
                  value="Kochi Bolgatty Wharf (KL-07)"
                  className="w-full bg-[#1b2333] border border-gray-700 rounded text-xs text-white pl-9 pr-3 py-3 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Pick Up Date */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Departure Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#1b2333] border border-gray-700 rounded text-xs text-white uppercase px-3 py-3 focus:outline-none focus:border-red-600 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Field 3: Dynamic Price Filter Slider matching Stitch */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-300">
                <span>Max Tariff</span>
                <span className="text-red-400 font-bold font-mono">
                  Up to ₹{maxPrice.toLocaleString('en-IN')}/day
                </span>
              </div>
              <div className="py-2.5">
                <input
                  type="range"
                  min="1200"
                  max="4500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Action */}
            <div>
              <Link
                to="/cars"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded transition flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 text-center font-mono"
              >
                <span>Explore 10 Cars</span>
                <i className="fas fa-arrow-right text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STITCH FEATURED FLEET (Matching Stitch exact layout & styles) */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 lg:px-12 w-full" id="featured">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-3 justify-center mb-1">
            <span className="w-8 h-0.5 bg-red-600" />
            <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide text-slate-900 font-display">
              Wayvero Verified Kerala Fleet (10 Cars)
            </h2>
            <span className="w-8 h-0.5 bg-red-600" />
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto font-body">
            Your Journey, Our Priority. — Choose from 10 verified Wayvero Kerala fleet vehicles. Transparent daily rates with optional concierge chauffeur assistance (Total = Days × [Car Base Price + Driver Charge]).
          </p>

          {/* Stitch Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-6" id="fleet-filters">
            {[
              { id: 'all', label: 'All Fleet (10)' },
              { id: 'suv', label: 'SUV / 4x4 (4)' },
              { id: 'sedan', label: 'Sedan (1)' },
              { id: 'hatchback', label: 'Hatchback (3)' },
              { id: 'mpv', label: 'MPV / 7-Seater (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  selectedCategory === tab.id
                    ? 'text-white bg-red-600 shadow-sm'
                    : 'text-slate-600 hover:text-red-600 bg-white border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stitch Interactive Pricing Rule Box */}
          <div className="mt-8 max-w-3xl mx-auto bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-left">
            <div className="flex items-center gap-3">
              <i className="fas fa-calculator text-red-500 text-lg" />
              <div>
                <span className="font-bold block uppercase tracking-wider text-[11px] text-gray-200 font-headline">
                  Wayvero Live Price Rule Engine
                </span>
                <span className="text-gray-400 font-mono text-[11px]">
                  Total = Days × (Car Base Rate + Chauffeur Rate if selected)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Spring Boot REST API Connected</span>
            </div>
          </div>
        </div>

        {/* Live Grid */}
        {loadingCars ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-xl bg-white border border-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest transition-all font-mono shadow-md"
          >
            <i className="fas fa-warehouse text-red-500 text-xs" />
            <span>View Full 10-Vehicle Fleet Catalog</span>
            <i className="fas fa-arrow-right text-xs" />
          </Link>
        </div>
      </section>

      {/* 4. STITCH "WHY CHOOSE US" SECTION (4 Pillars with Circular Red Border Badges) */}
      <section className="py-20 bg-white border-t border-gray-100 w-full" id="services">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          {/* Section Title */}
          <div className="text-center mb-16 space-y-2">
            <div className="inline-flex items-center gap-3 justify-center mb-2">
              <span className="w-8 h-0.5 bg-red-600" />
              <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide text-slate-900 font-display">
                Why Choose Us
              </h2>
              <span className="w-8 h-0.5 bg-red-600" />
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
              Your Journey, Our Priority. Delivering premier Kerala car rentals with seamless Wayvero concierge booking, verified vehicle inspections, and 24/7 dedicated support.
            </p>
          </div>

          {/* Feature Matrix matching Stitch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Item 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition duration-200 space-y-3">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-xl">
                <i className="fas fa-headset" />
              </div>
              <h3 className="text-sm font-bold uppercase text-slate-900 mb-2 font-display">
                Help Center &amp; Support 24/7
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                Round-the-clock roadside assistance and prompt Kerala concierge dispatch for every Wayvero trip.
              </p>
            </div>

            {/* Item 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition duration-200 space-y-3">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-xl">
                <i className="fas fa-shield-alt" />
              </div>
              <h3 className="text-sm font-bold uppercase text-slate-900 mb-2 font-display">
                Booking Any Class Vehicles
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                From executive sedans to 4x4 off-roaders, enjoy transparent pricing with zero security deposit lockups.
              </p>
            </div>

            {/* Item 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition duration-200 space-y-3">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-xl">
                <i className="fas fa-car-side" />
              </div>
              <h3 className="text-sm font-bold uppercase text-slate-900 mb-2 font-display">
                Car Sharing Options
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                Flexible self-drive and rental models with prompt doorstep delivery to airports, railway hubs, &amp; hotels.
              </p>
            </div>

            {/* Item 4 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition duration-200 space-y-3">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-xl">
                <i className="fas fa-gem" />
              </div>
              <h3 className="text-sm font-bold uppercase text-slate-900 mb-2 font-display">
                Limousine &amp; Chauffeur
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                Professional, multilingual Wayvero chauffeurs committed to punctuality and five-star travel comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TELEMETRY & SYSTEM METRICS COUNTER BAR */}
      <section className="py-12 bg-[#111317] border-t border-gray-800 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-red-500 font-display block">10</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400">Verified Fleet Cars</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-white font-display block">100%</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400">Authoritative Pricing</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-display block">24/7</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400">Concierge Handover</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-red-500 font-display block">₹0</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400">Hidden Fees</span>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-red-950/80 via-[#141a26] to-black border-t border-gray-800 text-center px-4 w-full">
        <div className="max-w-3xl mx-auto space-y-5 text-white">
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-wide">
            Ready to Travel Across Kerala?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-body">
            Create your account in seconds, select your favorite vehicle, and experience seamless car rental with Wayvero.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-900/50 font-mono"
            >
              Register Customer Account
            </Link>
            <Link
              to="/cars"
              className="px-8 py-3.5 rounded-lg bg-[#0b0e14] hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 font-bold text-xs uppercase tracking-wider transition-all font-mono"
            >
              Browse Available Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
