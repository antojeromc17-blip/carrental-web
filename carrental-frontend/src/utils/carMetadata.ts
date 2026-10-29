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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr96pRFtr6KCzNKMhFOidJVv5pH9Bi6Gi3cIyrwsD5E7b610E-3ZOk2KBjbZpLIU_9JeBogGZE4-o-BK-OtHcZJmnVyQYkOIeu_ZRQ0wxXX2WHeb1r_CHHM_bFTSQELh-npjiSH0UBqrhOiq7v02IJda7faVcsVfvAHe1yCvr--CEKXPQfLcCPyk566vBah6WKl-oQ1H7gT44a7GkBm0aE80tWVzS88NMAQbQF7fc',
  },
  swift: {
    category: 'Hatchback',
    seats: '5 Seats',
    transmission: '5-Spd Manual',
    fuel: 'Petrol (22 km/l)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCn5cZZgDggHdpwkja5j95rD5d1vXlabKpAAxGlgk-E06og_Ca63DOjaFkKLOALi-KNNuyXSuh-VTCr4BTVnoDdHJNExgZX4BOdeov_vS4YNCV2pExNhsUdwfK5zViTyw0n2JyXu5dsD28oxJAPHqzN8z2ck3Iwe3dQChPKYoWks2BHVrAmFL_-lK-AuWfdkQEt0Wyu7hOtzU5ZTJBMzyiebAiAZDIFgFptqcSqQCo',
  },
  creta: {
    category: 'Compact SUV',
    seats: '5 Seats',
    transmission: 'Automatic / DCT',
    fuel: 'Diesel / Petrol',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBH4wrOka7wq3xdXmXrswBy4v16DWxWt8fKuLA9wklMhR7y3xSaDxrZaztEybaCPesLBpKkrbrZvvd3JLJDo8hfuA0nLY2FkxQHJ1QawFZKDjQTBSv6bi8yZ3hZCdEan4p9EAhx8FddSYTpzCr5NsJ-1zdd9UFH_6vQbLxNgYN7mV7rZnXTN-weamJA2hUgx9uCNugEIeRhnxG9PeJ6_eYQOgAhtcU3mVi0Lai8Fo',
  },
  nexon: {
    category: 'Compact SUV',
    seats: '5 Seats',
    transmission: 'Turbo AMT',
    fuel: 'Diesel',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoR_4SPAuLA_HENBM_4wIIgnfTmAMxUWICA9BrSIKb051JhSd30HijD1TFI6n1oWwC063dQAPOBcERYn395fFB6mivffvhitTd3iI9E-6rcjsR0a_rJfa0i4WublME9YZkO1xLXGXr2rZ_QhnXrWaKDvbEr32dtqYClpfuA7yDqHTmjRD7vJq7q6h6bBzYSDQJRxekWmFhbH1dca3jR2XyD8fR2XBlGFkCXi7AvmM',
  },
  seltos: {
    category: 'Midsize SUV',
    seats: '5 Seats',
    transmission: '6-Spd Torque AT',
    fuel: 'CRDi Diesel',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8RArk5pfKiLN5OHG3ebO4D3gsF7F3TT7ONtlgwX_YvAINn1x-cHTeQQVohuK7PMYHsepdITnNW7tm9VUNop46RMk9H0mYxp8SIkLMZLysg7SQK1JyI5qxTDtzVEVExseQqj2QV5dSCNRW7hBOIEur0c75Yb6eidn32MkPyGIYdD-za20W1zYbYt93SXaV5eiprOldRIqS2vesugQe5T7PPnZeIJ0skc_U7J2d6vc',
  },
  thar: {
    category: 'SUV / 4x4 Off-Road',
    seats: '4 Modular',
    transmission: 'Manual 4WD Low',
    fuel: 'mHawk Diesel',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsMDTY-Y_zGwsjoUZnyI7r4Ugb810Q1M1_6_caV06Sihdz3JyJqkBOFen3nYW2g0DFSKIJe2j-3l5WeGBZ8kAdU-2JzWNBoPmm4lLM0oXsX6ntBvSuSFXjoCIQX62A9BA3OnvbQq1dBrbXE63JjK0dF_gOXiXy-sb-WB3OzgyW1qZ4quKKYcWfUtnrgiyDmAUNAkbyZdLpo-rH81DLz7TqZ3dSf_gJ7yy2c4YFjsU',
  },
  city: {
    category: 'Executive Sedan',
    seats: '5 Seats',
    transmission: 'i-VTEC CVT',
    fuel: 'Petrol',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSZ_4-oz44htIbk5m5zVf5LXzNQbsG8sJRM1IST2E0DbtsNAX8CJ3eDHUBkmM71HVGoiBR8Eb3Z4t2pC0ifncBidVCCkGC84OOtAzlwKbKP6lOE95WxLaRcVuUouugmA10VK-DvTf6iIYbaQZPn7T3q3XJ74BaLW6Ru7sqVRL0AGzNmhM4P7dA2lfdhguJ_YKF3fdIihWRSfgaLCsAo7QqBwH4kxBPS7sLcXpHIi4',
  },
  fortuner: {
    category: 'Luxury SUV / 4x4',
    seats: '7 Captain',
    transmission: '6-Spd AT 4x4',
    fuel: '2.8L Diesel',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNFxxZ4do_XEG_mvGtksoRwFwlpWch0p2zxGU_kr4c60znsti0zs5HnLdn0aWJBNajZwsnLzi1rCG7fvSgzVe58XTCwjWr7qDBWcDWqYf2dGz_y213YNuJX_PkTWtUbXcE_aiWjK0GHDa6Cu4PecC1V4qT9137qmUMlD1N8ehcVVYKq03iHvkLwrGHjoe-M8XBb2C8V4Jl5Dp3Diho3ZNhaZJCzJHGzR5WkdgfS8',
  },
  baleno: {
    category: 'Premium Hatchback',
    seats: '5 Seats',
    transmission: 'Smart Hybrid MT',
    fuel: 'Petrol',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwFQ7GpCZ9iaBqf67yP0MuPKoYOaHFt8SR9PupJ_Pz27DA7SxdOQFec1g3-U0hwokzpLARDNOHbwgztqII97bHIaAzQj6Zcm3sjyjdSZIplYjY3maxxJ4xxPegxpDQjWBIoIziMdO1MombiPGM5N4eVIQaVddTgF8RvEFVUlkxlu8bD2PaJXHuMAyyoRaMLTImn7luxqth7kKYen9JyWpxBYUhFzX2Ew2Gzb6Sck0',
  },
  i20: {
    category: 'Premium Hatchback',
    seats: '5 Seats',
    transmission: 'IVT Automatic',
    fuel: 'Petrol',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5dXQgzoaUczknlum72JsYP-rq07RsAeQs93LaU_hJ1oYp1ZsLFi80ULNssxFQuNK0zDzr47CuemcJfOhqOYSMm8sUrbeNMzNkb8dSI50B2L_5Y39S7Ghb4qH1YVbd8LcTGfVbDsh8P4DJxvbOGJEhA0dBWgzLEtsKE6YwzPeyMKU6WJ9VtrnB5wADJRcNLKgdYeofbr4-XBYt0zqHtwsyEjcxXOpVzasQYyhQmOo',
  },
};

const DEFAULT_PRESENTATION: CarPresentation = {
  category: 'Passenger Vehicle',
  seats: '5 Seats',
  transmission: 'Manual',
  fuel: 'Petrol',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNFxxZ4do_XEG_mvGtksoRwFwlpWch0p2zxGU_kr4c60znsti0zs5HnLdn0aWJBNajZwsnLzi1rCG7fvSgzVe58XTCwjWr7qDBWcDWqYf2dGz_y213YNuJX_PkTWtUbXcE_aiWjK0GHDa6Cu4PecC1V4qT9137qmUMlD1N8ehcVVYKq03iHvkLwrGHjoe-M8XBb2C8V4Jl5Dp3Diho3ZNhaZJCzJHGzR5WkdgfS8',
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
