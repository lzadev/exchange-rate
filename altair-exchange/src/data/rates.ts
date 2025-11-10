export interface Rate {
  from: string;
  to: string;
  rate: number;
}

export const rates: Rate[] = [
  { from: 'USD', to: 'EUR', rate: 0.92 },
  { from: 'EUR', to: 'USD', rate: 1.09 },
  { from: 'USD', to: 'GBP', rate: 0.8 },
  { from: 'GBP', to: 'USD', rate: 1.25 },
  { from: 'EUR', to: 'GBP', rate: 0.85 },
  { from: 'GBP', to: 'EUR', rate: 1.18 },
  { from: 'USD', to: 'JPY', rate: 115.0 },
  { from: 'JPY', to: 'USD', rate: 0.0087 },
  { from: 'EUR', to: 'JPY', rate: 130.0 },
  { from: 'JPY', to: 'EUR', rate: 0.0079 },
  { from: 'USD', to: 'DOP', rate: 58.0 },
  { from: 'DOP', to: 'USD', rate: 0.0172 },
  { from: 'EUR', to: 'DOP', rate: 70.0 },
  { from: 'DOP', to: 'EUR', rate: 0.0143 },
  { from: 'GBP', to: 'DOP', rate: 78.0 },
  { from: 'DOP', to: 'GBP', rate: 0.0128 },
  { from: 'JPY', to: 'DOP', rate: 0.55 },
  { from: 'DOP', to: 'JPY', rate: 1.85 },
];
