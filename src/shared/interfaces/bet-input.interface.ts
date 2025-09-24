export interface BetInputInterface {
  player: string;
  user_id: string;
  operatorId: string;
  gameId: string;
  round: string;
  platform: string;
  totalAmount: number;
  currency: string;
  bet: Bet[];
}

export interface Bet {
  number: number;
  amount: number;
}
