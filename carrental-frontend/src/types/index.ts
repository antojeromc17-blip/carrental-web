/**
 * TypeScript Data Models matching authoritative Spring Boot backend schemas.
 */

export interface Car {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  pricePerDay: number;
  available: boolean;
  driverAvailable: boolean;
  driverChargePerDay: number;
  // UI Display Enhancements (mapped based on model)
  imageUrl?: string;
  category?: string;
  seats?: number;
  transmission?: string;
  fuelType?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface CustomerAuthResponse {
  id: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Booking {
  id: number;
  customerId: number;
  carId: number;
  pickupDate: string; // yyyy-MM-dd
  returnDate: string; // yyyy-MM-dd
  driverRequired: boolean;
  totalPrice: number;
  status: 'BOOKED' | 'RETURNED' | string;
}

export interface CreateBookingRequest {
  customerId: number;
  carId: number;
  pickupDate: string; // yyyy-MM-dd
  returnDate: string; // yyyy-MM-dd
  driverRequired: boolean;
}

