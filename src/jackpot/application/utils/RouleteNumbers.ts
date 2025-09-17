export const ROULETTE_NUMBERS: string[] = [
  '0',
  '00',
  ...Array.from({ length: 36 }, (_, i) => (i + 1).toString()),
];
