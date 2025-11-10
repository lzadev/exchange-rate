export interface Rate {
  from: string;
  to: string;
  rate: number;
}

export const rates: Rate[] = [
  { from: 'USD', to: 'EUR', rate: 0.85 },
  { from: 'EUR', to: 'USD', rate: 1.18 },
  { from: 'USD', to: 'GBP', rate: 0.75 },
  { from: 'GBP', to: 'USD', rate: 1.33 },
  { from: 'EUR', to: 'GBP', rate: 0.88 },
  { from: 'GBP', to: 'EUR', rate: 1.14 },
  { from: 'USD', to: 'JPY', rate: 110.0 },
  { from: 'JPY', to: 'USD', rate: 0.0091 },
  { from: 'EUR', to: 'JPY', rate: 129.53 },
  { from: 'JPY', to: 'EUR', rate: 0.0077 },
  { from: 'USD', to: 'DOP', rate: 56.75 },
  { from: 'DOP', to: 'USD', rate: 0.0176 },
  { from: 'EUR', to: 'DOP', rate: 67.5 },
  { from: 'DOP', to: 'EUR', rate: 0.0148 },
  { from: 'GBP', to: 'DOP', rate: 75.3 },
  { from: 'DOP', to: 'GBP', rate: 0.0133 },
  { from: 'JPY', to: 'DOP', rate: 0.52 },
  { from: 'DOP', to: 'JPY', rate: 1.92 },
];
