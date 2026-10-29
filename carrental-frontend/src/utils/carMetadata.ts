import type { Car } from '../types';

export interface CarPresentation {
  category: string;
  seats: string;
  transmission: string;
  fuel: string;
  imageUrl: string;
}

const CAR_META_LOOKUP: Record<string, CarPresentation> = {
  innova: {
    category: 'MPV / 7-Seater',
    seats: '7 Captain',
    transmission: 'Manual / AT',
    fuel: 'Diesel',
    imageUrl:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
  },
  swift: {
    category: 'Hatchback',
    seats: '5 Seats',
    transmission: '5-Spd Manual',
    fuel: 'Petrol (22 km/l)',
    imageUrl:
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85',
  },
  creta: {
    category: 'Compact SUV',
    seats: '5 Seats',
    transmission: 'Automatic / DCT',
    fuel: 'Diesel / Petrol',
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
  },
  nexon: {
    category: 'Compact SUV',
    seats: '5 Seats',
    transmission: 'Turbo AMT',
    fuel: 'Diesel',
    imageUrl:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
  },
  seltos: {
    category: 'Midsize SUV',
    seats: '5 Seats',
    transmission: '6-Spd Torque AT',
    fuel: 'CRDi Diesel',
    imageUrl:
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
  },
  thar: {
    category: 'SUV / 4x4 Off-Road',
    seats: '4 Modular',
    transmission: 'Manual 4WD Low',
    fuel: 'mHawk Diesel',
    imageUrl:
      'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1200&q=85',
  },
  city: {
    category: 'Executive Sedan',
    seats: '5 Seats',
    transmission: 'i-VTEC CVT',
    fuel: 'Petrol',
    imageUrl:
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=85',
  },
  fortuner: {
    category: 'Luxury SUV / 4x4',
    seats: '7 Captain',
    transmission: '6-Spd AT 4x4',
    fuel: '2.8L Diesel',
    imageUrl:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',
  },
  baleno: {
    category: 'Premium Hatchback',
    seats: '5 Seats',
    transmission: 'Smart Hybrid MT',
    fuel: 'Petrol',
    imageUrl:
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85',
  },
  i20: {
    category: 'Premium Hatchback',
    seats: '5 Seats',
    transmission: 'IVT Automatic',
    fuel: 'Petrol',
    imageUrl:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85',
  },
};

const DEFAULT_PRESENTATION: CarPresentation = {
  category: 'Passenger Vehicle',
  seats: '5 Seats',
  transmission: 'Manual',
  fuel: 'Petrol',
  imageUrl:
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
};

export function getCarPresentation(car: Car): CarPresentation {
  const modelKey = car.model.toLowerCase();
  for (const [key, value] of Object.entries(CAR_META_LOOKUP)) {
    if (modelKey.includes(key)) {
      return value;
    }
  }
  return DEFAULT_PRESENTATION;
}
