import type {
  Car,
  Customer,
  RegisterRequest,
  LoginRequest,
  Booking,
  CreateBookingRequest,
} from '../types';

/**
 * Single Centralized API Client.
 * Uses relative '/api' URL in development, seamlessly forwarded to http://localhost:8080 by Vite proxy.
 */
const BASE_URL = '/api';

/**
 * Standard fetch helper with error handling.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const text = await response.text();
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected network error occurred.');
  }
}

// ----------------------------------------------------------------------
// Cars API
// ----------------------------------------------------------------------

export async function fetchCars(): Promise<Car[]> {
  return request<Car[]>('/cars');
}

// ----------------------------------------------------------------------
// Customers Authentication API
// ----------------------------------------------------------------------

export async function registerCustomer(data: RegisterRequest): Promise<Customer> {
  return request<Customer>('/customers/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginCustomer(data: LoginRequest): Promise<Customer> {
  return request<Customer>('/customers/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ----------------------------------------------------------------------
// Bookings API
// ----------------------------------------------------------------------

export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  return request<Booking>('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchCustomerBookings(customerId: number): Promise<Booking[]> {
  return request<Booking[]>(`/bookings/customer/${customerId}`);
}

export async function returnBookingCar(bookingId: number): Promise<Booking> {
  return request<Booking>(`/bookings/${bookingId}/return`, {
    method: 'PUT',
  });
}

