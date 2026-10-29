import React, { useState, useEffect, useMemo } from 'react';
import type { Car } from '../types';
import { fetchCars } from '../api';
import { CarCard } from '../components/CarCard';
import { getCarPresentation } from '../utils/carMetadata';

export const BrowseCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters and Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'available' | 'unavailable'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  const loadCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCars();
      setCars(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load cars. Is the Spring Boot backend running?'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // Filter & Sort Calculation
  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search query filter (matches brand, model, registrationNumber)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.registrationNumber.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((c) => {
        const meta = getCarPresentation(c);
        return meta.category.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    // Availability filter
    if (selectedAvailability === 'available') {
      result = result.filter((c) => c.available);
    } else if (selectedAvailability === 'unavailable') {
      result = result.filter((c) => !c.available);
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
    }

    return result;
  }, [cars, searchQuery, selectedCategory, selectedAvailability, sortBy]);

  const availableCount = useMemo(() => cars.filter((c) => c.available).length, [cars]);
  const bookedCount = useMemo(() => cars.filter((c) => !c.available).length, [cars]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAvailability('all');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 lg:py-12 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 space-y-6">
        {/* Telemetry & API Status Banner (Stitch Light Theme) */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono font-bold border border-slate-200">
              <span className="text-emerald-600 font-bold">GET</span> /api/cars
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium font-mono">
              <span className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
              {error ? 'API Disconnected' : 'Live Spring Boot Connection'}
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="text-slate-600 font-mono">
              Fleet: <strong className="text-slate-900">{cars.length}</strong> cars (
              <span className="text-emerald-700 font-semibold">{availableCount} ready</span>,{' '}
              <span className="text-amber-700 font-semibold">{bookedCount} dispatched</span>)
            </span>
          </div>

          <button
            onClick={loadCars}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition-colors self-start md:self-auto disabled:opacity-50 cursor-pointer"
          >
            <i className={`fas fa-sync-alt text-[10px] ${loading ? 'animate-spin' : ''}`} />
            <span>Re-fetch Fleet</span>
          </button>
        </section>

        {/* Filter Desk / Control Bar (Stitch Light Theme) */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          {/* Top Row: Search input and Sort dropdown */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search make, model, or KL registration (e.g. Innova, Thar, KL-07-AB-1234)..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-lg pl-9 pr-9 py-2.5 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-2">
              <div className="relative min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-red-600 cursor-pointer pr-8"
                >
                  <option value="default">Sort: Default Order</option>
                  <option value="price-asc">Tariff: Low to High</option>
                  <option value="price-desc">Tariff: High to Low</option>
                  <option value="name-asc">Make & Model (A-Z)</option>
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
              </div>

              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all filters"
              >
                <i className="fas fa-undo text-[10px]" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Category & Availability Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-gray-100">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'suv', label: 'SUV / 4x4' },
                { id: 'sedan', label: 'Sedan' },
                { id: 'hatchback', label: 'Hatchback' },
                { id: 'mpv', label: 'MPV / 7-Seater' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Availability Toggle */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start lg:self-auto text-xs font-medium">
              <button
                onClick={() => setSelectedAvailability('all')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedAvailability === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({cars.length})
              </button>
              <button
                onClick={() => setSelectedAvailability('available')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedAvailability === 'available'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available ({availableCount})
              </button>
              <button
                onClick={() => setSelectedAvailability('unavailable')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedAvailability === 'unavailable'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Booked ({bookedCount})
              </button>
            </div>
          </div>
        </section>

        {/* Live Matches Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display uppercase tracking-wider">
              Fleet Catalog
            </h2>
            <span className="bg-red-50 border border-red-200 text-red-700 font-mono font-bold px-2.5 py-0.5 rounded-md text-xs">
              {filteredCars.length} MATCHES
            </span>
          </div>
          <span className="hidden sm:inline text-slate-500 font-medium">
            Click "Reserve" on any available vehicle to proceed to reservation.
          </span>
        </div>

        {/* --- STATE 1: ERROR STATE --- */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto border border-red-200">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 font-display uppercase">
                Could Not Load Fleet Catalog
              </h3>
              <p className="text-xs text-red-700 max-w-md mx-auto leading-relaxed">
                {error}
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Please verify that the Spring Boot backend is running on{' '}
                <code className="text-slate-800 bg-slate-200 px-1 py-0.5 rounded">http://localhost:8080</code>.
              </p>
            </div>
            <button
              onClick={loadCars}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <i className="fas fa-redo text-xs" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* --- STATE 2: LOADING SKELETON STATE --- */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden h-[420px] flex flex-col justify-between p-4 space-y-4 shadow-sm"
              >
                <div className="w-full h-48 bg-slate-100 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 bg-slate-100 rounded" />
                  <div className="h-10 bg-slate-100 rounded" />
                  <div className="h-10 bg-slate-100 rounded" />
                </div>
                <div className="h-10 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* --- STATE 3: EMPTY STATE (NO FILTER MATCHES) --- */}
        {!loading && !error && filteredCars.length === 0 && (
          <div className="bg-white border border-gray-200 p-12 rounded-xl text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto border border-slate-200">
              <i className="fas fa-car-side" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-display uppercase">
                No Vehicles Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No vehicles in our fleet match your active filters or search keyword.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <i className="fas fa-undo text-[10px]" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* --- STATE 4: SUCCESS STATE (RENDER LIVE CARS) --- */}
        {!loading && !error && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
