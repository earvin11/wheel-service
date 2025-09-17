export interface OperatorLimitsEntity {
  currency: string;
  operator: string;
  short: string;
  minBet: number;
  maxBet: number;
  uuid?: string;
}
