import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCustomerBookings, fetchCars, returnBookingCar } from '../api';
import type { Booking, Car } from '../types';
import { getCarPresentation } from '../utils/carMetadata';

export const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filter tab state
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BOOKED' | 'RETURNED'>('ALL');

  // Modal State
  const [selectedBookingForReturn, setSelectedBookingForReturn] = useState<{
    booking: Booking;
    car?: Car;
  } | null>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Load customer bookings & cars fleet lookup
  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setFetchError(null);
      const [bookingsData, carsData] = await Promise.all([
        fetchCustomerBookings(user.id),
        fetchCars(),
      ]);
      // Sort newest bookings first
      const sortedBookings = [...bookingsData].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      setBookings(sortedBookings);
      setCars(carsData);
    } catch (err) {
      setFetchError(
        err instanceof Error
          ? err.message
          : 'Failed to retrieve booking records. Please verify server status.'
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Return Submission
  const handleConfirmReturn = async () => {
    if (!selectedBookingForReturn?.booking.id) return;
    try {
      setIsReturning(true);
      setModalError(null);

      const bookingId = selectedBookingForReturn.booking.id;
      await returnBookingCar(bookingId);

      // Update local state immediately
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'RETURNED' } : b))
      );

      // Re-fetch cars fleet in background to update car availability flag
      fetchCars().then(setCars).catch(() => {});

      const carName = selectedBookingForReturn.car
        ? `${selectedBookingForReturn.car.brand} ${selectedBookingForReturn.car.model}`
        : 'Vehicle';

      setSuccessToast(
        `Successfully returned ${carName}! Booking #${bookingId} marked RETURNED and vehicle availability restored.`
      );
      setSelectedBookingForReturn(null);

      // Clear toast after 5 seconds
      setTimeout(() => {
        setSuccessToast(null);
      }, 5000);
    } catch (err) {
      setModalError(
        err instanceof Error
          ? err.message
          : 'Failed to process vehicle return with backend.'
      );
    } finally {
      setIsReturning(false);
    }
  };

  // Filtered bookings list
  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'ALL') return true;
    return b.status === activeFilter;
  });

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-slate-900">
      <div className="relative w-full overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-slate-200/50 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Sub-Navbar Context Strip matching Stitch */}
        <section className="w-full bg-white border-b border-gray-200 px-4 sm:px-8 py-3 shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  Logged in as: <strong className="text-slate-900 font-semibold">{user?.name}</strong>
                </span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono border border-slate-200">
                Customer ID: <strong className="text-emerald-700">#{user?.id}</strong>
              </span>
              <span className="hidden sm:inline text-slate-300 font-mono">•</span>
              <span className="text-slate-500 font-mono">
                Email: <span className="text-slate-700 font-medium">{user?.email}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Session Connected</span>
              </span>
            </div>
          </div>
        </section>

        {/* API Endpoint Inspector Header Panel matching Stitch */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <div className="relative w-full rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Route Specs */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] uppercase font-bold">
                    HTTP GET
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-slate-900">
                    /api/bookings/customer/{user?.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    200 OK
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Customer ID dynamically bound from active session store: <code className="text-red-600 font-bold">#{user?.id}</code>
                </p>
              </div>

              {/* Real-time Query Metrics */}
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-semibold">
                    Total Records
                  </div>
                  <div className="text-xl font-bold text-slate-900 font-mono">
                    {bookings.length} Booking{bookings.length === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-semibold">
                    Depot Hub
                  </div>
                  <div className="text-sm font-mono font-bold text-red-600">
                    Kochi Central
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Toast Banner */}
        {successToast && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 animate-fadeIn">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-base text-emerald-600"></i>
                <span className="font-mono font-semibold">{successToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setSuccessToast(null)}
                className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 font-bold">
                Fleet Operations &amp; Concierge Handover
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display uppercase tracking-wide">
                My Bookings Dashboard
              </h1>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveFilter('ALL')}
                className={`px-3 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeFilter === 'ALL'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('BOOKED')}
                className={`px-3 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeFilter === 'BOOKED'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active ({bookings.filter((b) => b.status === 'BOOKED').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('RETURNED')}
                className={`px-3 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                  activeFilter === 'RETURNED'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Returned ({bookings.filter((b) => b.status === 'RETURNED').length})
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-full h-56 rounded-xl bg-white border border-gray-200 animate-pulse p-6 flex flex-col justify-between shadow-sm"
                >
                  <div className="h-6 w-1/3 bg-slate-100 rounded"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  <div className="h-10 w-full bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Fetch Error Notice */}
          {fetchError && !loading && (
            <div className="p-8 rounded-xl bg-red-50 border border-red-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <i className="fas fa-exclamation-circle text-2xl"></i>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-display uppercase tracking-wider">
                Failed to Retrieve Bookings
              </h2>
              <p className="text-xs text-red-700 font-mono max-w-md mx-auto">{fetchError}</p>
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <i className="fas fa-sync-alt text-xs"></i>
                Retry Connection
              </button>
            </div>
          )}

          {/* Empty Bookings State */}
          {!loading && !fetchError && filteredBookings.length === 0 && (
            <div className="p-12 rounded-xl bg-white border border-gray-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <i className="fas fa-file-invoice text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-wide">
                {activeFilter === 'ALL'
                  ? 'No Bookings Found'
                  : `No ${activeFilter} Bookings Found`}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-body">
                {activeFilter === 'ALL'
                  ? "You haven't reserved any vehicles yet. Explore our premier fleet in Kochi and book your vehicle in seconds."
                  : `There are currently no bookings with status "${activeFilter}".`}
              </p>
              <div className="pt-2">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
                >
                  <i className="fas fa-car text-xs"></i>
                  <span>Browse Available Fleet</span>
                </Link>
              </div>
            </div>
          )}

          {/* Bookings List Cards matching Stitch */}
          {!loading && !fetchError && filteredBookings.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {filteredBookings.map((b) => {
                const matchedCar = cars.find((c) => c.id === b.carId);
                const presentation = matchedCar ? getCarPresentation(matchedCar) : null;
                const isBooked = b.status === 'BOOKED';

                return (
                  <article
                    key={b.id}
                    className="w-full rounded-xl p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all border bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Column 1: Studio Car Photography (lg:col-span-4) */}
                      <div className="lg:col-span-4 w-full h-48 sm:h-56 rounded-lg overflow-hidden relative bg-slate-100 border border-gray-200">
                        {presentation ? (
                          <img
                            src={presentation.imageUrl}
                            alt={matchedCar ? `${matchedCar.brand} ${matchedCar.model}` : 'Vehicle'}
                            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                              !isBooked ? 'grayscale contrast-125 opacity-70' : ''
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 text-xs font-mono">
                            Vehicle #{b.carId}
                          </div>
                        )}

                        {/* License Plate Tag */}
                        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-white border border-white/20">
                          {matchedCar?.registrationNumber || `ID #${b.carId}`}
                        </div>

                        {/* Telemetry / Status strip at bottom of image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono">
                          <span className="text-slate-300 uppercase">
                            {isBooked ? 'Depot Dispatch' : 'Settlement Status'}
                          </span>
                          <span className={isBooked ? 'text-white' : 'text-emerald-400 font-bold'}>
                            {isBooked ? 'Kochi Bolgatty Wharf' : 'Checked In • Settled'}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Booking Details & Specs (lg:col-span-5) */}
                      <div className="lg:col-span-5 space-y-4">
                        {/* Status badge & Reference */}
                        <div className="flex flex-wrap items-center gap-2">
                          {isBooked ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold border border-emerald-200">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>ACTIVE / IN-RENTAL</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold border border-slate-200">
                              <i className="fas fa-check-circle text-xs text-emerald-600"></i>
                              <span>RETURNED / COMPLETED</span>
                            </span>
                          )}

                          <span className="font-mono text-xs text-slate-500">
                            Ref: <strong className="text-slate-900">#BKG-{b.id}</strong>
                          </span>
                        </div>

                        {/* Vehicle Title & Specs */}
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display uppercase tracking-wide">
                            {matchedCar ? `${matchedCar.brand} ${matchedCar.model}` : `Vehicle ID #${b.carId}`}
                          </h2>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            {presentation?.category || 'Fleet Category'} • {presentation?.transmission || 'Transmission'} • {presentation?.fuel || 'Fuel'}
                          </p>
                        </div>

                        {/* 3 Metric Summary Boxes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Rental Window</span>
                            <span className="text-slate-900 font-semibold block mt-0.5">{b.pickupDate}</span>
                            <span className="text-slate-500 text-[11px]">to {b.returnDate}</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Driver</span>
                            <span className={b.driverRequired ? 'text-emerald-700 font-semibold block mt-0.5' : 'text-slate-700 font-semibold block mt-0.5'}>
                              {b.driverRequired ? 'Yes (Assigned)' : 'Self-Drive'}
                            </span>
                            <span className="text-slate-400 text-[10px]">
                              {b.driverRequired ? 'Chauffeur Included' : 'No Driver'}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Authoritative Total</span>
                            <span className="text-base font-black text-red-600 font-display block mt-0.5">
                              ₹{b.totalPrice?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold">Backend Verified</span>
                          </div>
                        </div>

                        {/* Telemetry Pin */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                          <i className="fas fa-map-marker-alt text-xs text-red-600"></i>
                          <span>Dispatch &amp; Return Point: Kochi Bolgatty Wharf</span>
                        </div>
                      </div>

                      {/* Column 3: Handover Call-to-Action Zone (lg:col-span-3) */}
                      <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end gap-3 lg:pl-4 lg:border-l lg:border-gray-200">
                        <div className="text-left lg:text-right space-y-0.5 font-mono">
                          <span className="text-[10px] uppercase tracking-widest text-slate-400 block font-semibold">
                            Fleet Telemetry Status
                          </span>
                          <span className="text-xs font-bold text-slate-900 block">
                            {isBooked ? 'Vehicle With Customer' : 'Returned & Processed'}
                          </span>
                        </div>

                        {/* Return Action Button matching Stitch */}
                        {isBooked ? (
                          <div className="w-full lg:w-auto space-y-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedBookingForReturn({ booking: b, car: matchedCar })}
                              className="w-full lg:w-auto px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <i className="fas fa-key text-xs"></i>
                              <span>Return Car • PUT /api/bookings/{b.id}/return</span>
                            </button>
                            <span className="text-[10px] text-slate-400 font-mono block text-center lg:text-right">
                              Invokes transactional return engine
                            </span>
                          </div>
                        ) : (
                          <div className="w-full lg:w-auto space-y-1.5">
                            <button
                              type="button"
                              disabled
                              className="w-full lg:w-auto px-5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <i className="fas fa-check-circle text-xs text-emerald-600"></i>
                              <span>Returned &amp; Settled</span>
                            </button>
                            <span className="text-[10px] text-slate-400 font-mono block text-center lg:text-right">
                              Car available in fleet catalog
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Operational Concierge Footer Strip */}
          <div className="mt-12 p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-2xs">
                <i className="fas fa-concierge-bell text-base"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
                  Kerala Concierge Vehicle Handover Desk
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Live synchronized return dispatch • Bolgatty Wharf &amp; Cochin International Airport
                </p>
              </div>
            </div>

            <Link
              to="/cars"
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <i className="fas fa-car text-xs"></i>
              <span>Browse More Cars</span>
            </Link>
          </div>
        </div>
      </div>

      {/* VEHICLE RETURN MODAL matching Stitch */}
      {selectedBookingForReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-2xl text-slate-900 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold">
                  Action: PUT /api/bookings/{selectedBookingForReturn.booking.id}/return
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display uppercase tracking-wide mt-0.5">
                  Initiate Vehicle Return
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookingForReturn(null)}
                disabled={isReturning}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Target Endpoint Box */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-bold border border-red-200">
                  PUT
                </span>
                <span className="text-slate-800 font-semibold">
                  /api/bookings/{selectedBookingForReturn.booking.id}/return
                </span>
              </div>
              <span className="text-emerald-700 text-[11px] font-semibold">System Ready</span>
            </div>

            {/* Vehicle Details Card */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Designated Return Depot:</span>
                <span className="text-slate-900 font-semibold">Cochin Bolgatty Wharf Gate 2</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Vehicle Profile:</span>
                <span className="text-slate-900 font-semibold">
                  {selectedBookingForReturn.car
                    ? `${selectedBookingForReturn.car.brand} ${selectedBookingForReturn.car.model} (${selectedBookingForReturn.car.registrationNumber})`
                    : `Vehicle #${selectedBookingForReturn.booking.carId}`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/70">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="text-red-600 font-bold">#BKG-{selectedBookingForReturn.booking.id}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Rental Period:</span>
                <span className="text-slate-900 font-semibold">
                  {selectedBookingForReturn.booking.pickupDate} to {selectedBookingForReturn.booking.returnDate}
                </span>
              </div>
            </div>

            {/* Inspection Checklist */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Mandatory Inspection Checklist
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white border-slate-300"
                  />
                  <span className="text-slate-700 text-[11px] font-medium">Fuel Tank: Full to Full</span>
                </label>
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white border-slate-300"
                  />
                  <span className="text-slate-700 text-[11px] font-medium">Odometer Telemetry Sync</span>
                </label>
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white border-slate-300"
                  />
                  <span className="text-slate-700 text-[11px] font-medium">Exterior Hull: No Damage</span>
                </label>
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white border-slate-300"
                  />
                  <span className="text-slate-700 text-[11px] font-medium">Kerala Fastag Toll Clear</span>
                </label>
              </div>
            </div>

            {/* Error in modal if any */}
            {modalError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs font-mono">
                {modalError}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedBookingForReturn(null)}
                disabled={isReturning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReturn}
                disabled={isReturning}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isReturning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Return...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle text-xs"></i>
                    <span>Confirm Handover &amp; Mark Returned</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
