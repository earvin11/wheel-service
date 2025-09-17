export interface WheelEntity {
  name: string;
  providerId: string;
  roundDuration: number;
  urlTransmision: string;
  openingTime: string;
  closingTime: string;
  imgBackground: string;
  active?: boolean;
  manualDisable?: boolean;
  uuid?: string;
  percentReturnToPlayer: number;
  bank: number;
  startRoundTime: number;
  betPays: BetPay[];
  alwaysOpen?: boolean;
  maxBetFigures: number;
  startRoundTime: number;
  betTime: number;
  jackpot: boolean;
  type?: string;
}

export interface BetPay {
  number: number;
  multiplier: number;
}
