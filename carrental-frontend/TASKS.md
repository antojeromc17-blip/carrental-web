# Project Tasks: Car Rental Management System

> **Pair-Programming Task Tracker**
> College B.Tech CSE Project • Frontend & Full-Stack Integration

---

## Phase Checklist

### Phase 1: Inspect & Verify Backend and Design Files (No Frontend Code Yet)
- [x] **1.1** Locate the backend folder and Stitch design files; report real paths and list every screen found.
- [x] **1.2** Read `Car.java`, `Customer.java`, `Booking.java`, all Controllers, Repositories, and Services. Report real field names/types and endpoint behavior (including BCrypt password hashing, sessionless auth, and CORS).
- [x] **1.3** Check Java 17, Maven wrapper, and `application.properties` (without exposing the MySQL password).
- [x] **1.4** Start the backend server on port 8080 and test `GET /api/cars` to verify live JSON response.
- [x] **1.5** Write initial `DOCUMENTATION.md` (with architecture, Stitch design system summary) and `TASKS.md`.

---

### Phase 2: Create the Frontend Project
- [x] **2.1** Create `carrental-frontend` using Vite + React 19 + TypeScript.
- [x] **2.2** Install and configure Tailwind CSS v4 and React Router v7 (`react-router-dom`).
- [x] **2.3** Apply Stitch theme design tokens (colors `#e50914`, `#111317`, `#0b0e14`, fonts `Plus Jakarta Sans` / `Rajdhani`, custom scrollbar) into Tailwind config and `src/index.css`.
- [x] **2.4** Establish clean directory structure: `src/pages`, `src/components`, `src/api`, `src/types`, `src/context`.
- [x] **2.5** Create TypeScript interfaces matching the real backend models (`Car`, `Customer`, `Booking`) in `src/types/index.ts`.
- [x] **2.6** Create centralized API helper module in `src/api/index.ts` with relative `/api` base URL setting.
- [x] **2.7** Configure Vite reverse proxy (`/api` $\rightarrow$ `http://localhost:8080`) to eliminate CORS issues without altering backend code (verified with proxy probe).
- [x] **2.8** Build responsive shared layout from Stitch: sticky Topbar, Navbar (brand logo, links, dynamic user authentication status, mobile menu), and Footer.

---

### Phase 3: Browse Cars (First Live Backend Connection)
- [x] **3.1** Fetch live fleet from `GET /api/cars` and render car cards matching Stitch design: brand, model, price/day (₹), driver availability badge, registration number.
- [x] **3.2** Show active "Book Now" CTA for available cars; disabled "Not Available (Booked)" state for unavailable cars.
- [x] **3.3** Implement loading skeleton (shimmer placeholders), user-friendly error notice ("Could not load cars. Is the server running?"), and empty filter matches state with reset option.
- [x] **3.4** Verify live data display against real database records and document behavior.

---

### Phase 4: Registration and Login
- [x] **4.1** Build Registration page matching Stitch: name, email, password, confirm password, field validations; submit to `POST /api/customers/register`; show success redirect and backend errors.
- [x] **4.2** Build Login page matching Stitch: email, password, toggle show/hide; submit to `POST /api/customers/login`.
- [x] **4.3** Store returned customer object (`id`, `name`, `email`) in React `AuthContext` and `localStorage` so page refresh keeps customer logged in. (Never store passwords, no tokens).
- [x] **4.4** Implement Logout (clears session state) and `ProtectedRoute` guards redirecting unauthenticated users to `/login` when trying to book or access bookings.
- [x] **4.5** Add honest documentation note: this is basic authenticated session binding, not cryptographically signed JWT/token auth.

---

### Phase 5: Booking and Confirmation Flow
- [x] **5.1** Build `/book/:carId` screen matching Stitch layout with selected vehicle details.
- [x] **5.2** Input fields: pickup date, return date, optional chauffeur checkbox (only enabled if `driverAvailable == true`).
- [x] **5.3** Client-side validation: mandatory dates, return $\ge$ pickup, pickup $\ge$ today.
- [x] **5.4** Dynamic live price estimation using backend formula: $\text{days} \times (\text{pricePerDay} + \text{driverChargePerDay})$.
- [x] **5.5** Submit reservation to `POST /api/bookings` with customer ID and `yyyy-MM-dd` date strings.
- [x] **5.6** Graceful error feedback for unavailable cars or invalid inputs.
- [x] **5.7** Build Confirmation page matching Stitch: booking ID, car info, rental dates, driver status, backend-authoritative `totalPrice`, and `status: BOOKED`.

---

### Phase 6: My Bookings & Return Car
- [x] **6.1** Build My Bookings page (desktop table, mobile cards) fetching `GET /api/bookings/customer/{customerId}`.
- [x] **6.2** Resolve `carId` to car brand/model using the car fleet lookup, with graceful fallback.
- [x] **6.3** Display dates, driver indicator, authoritative total price, and status badge (`BOOKED` vs `RETURNED`).
- [x] **6.4** Show "Return Car" action button only on `BOOKED` records with Stitch confirmation modal.
- [x] **6.5** Call `PUT /api/bookings/{id}/return`, re-fetch bookings and update car availability immediately.

---

### Phase 7: Home Page & Visual Polish
- [x] **7.1** Build landing page: Hero banner with CTA, "Featured Fleet" section dynamically fed from live backend, "How It Works" 3-step section.
- [x] **7.2** Match visual fidelity with Stitch screenshots across desktop and mobile breakpoints.
- [x] **7.3** Clean code, remove dead imports, eliminate debug logs, and build 404 page.

---

### Phase 8: End-to-End Verification & Final Documentation
- [x] **8.1** Execute complete end-to-end user journey and record exact outputs for each step.
- [x] **8.2** Finalize `DOCUMENTATION.md` with complete API reference table, test matrix, and Viva/Examiner defense guide.
- [x] **8.3** Create comprehensive project `README.md` with startup instructions.

---

## Project Status: 100% COMPLETE & VERIFIED
- **All 8 Phases Finished**: Phases 1 through 8 have been built, connected to the Spring Boot REST API, verified against MySQL 8, and documented.
- **Backend Integrity Preserved**: Zero modifications were made to Spring Boot code, entity mappings, API contracts, or application properties.
- **Design System Fidelity**: All views faithfully reflect the Google Stitch Dark Luxury Design System.
- **Viva Defense Prepared**: Comprehensive examiner defense guide, architecture diagrams, test matrices, and startup guides are fully documented in `DOCUMENTATION.md` and `README.md`.
