export interface RoundEntity {
  // _id?: string;
  code: string;
  start_date: Date;
  end_date: Date;
  jackpot_values?: any[];
  // jackpot_values: JackpotValues[];
  result: number;
  providerId: string;
  roulette: string;
  open: boolean;
  number: number;
  identifierNumber: number;
  uuid?: string;
  // crupier: string;
}
