export interface BetInputInterface {
  player: string;
  user_id: string;
  operatorId: string;
  clientId: string;
  roulette: string;
  round: string;
  platform: string;
  ID_Ronda: string;
  identifierNumber: number;
  lastBalance: number;
  totalAmount: number;
  currency: string;
  bet: Bet;
}

export interface Bet {
  calleNumbers: NumberBet[];
  chanceSimple: ChanceSimple[];
  color: ChanceSimple[];
  columns: ChanceSimple[];
  cuadroNumbers: NumberBet[];
  cubre: ChanceSimple[];
  dozens: ChanceSimple[];
  even_odd: ChanceSimple[];
  lineaNumbers: NumberBet[];
  plenoNumbers: NumberBet[];
  semiPlenoNumbers: NumberBet[];
  specialCalle: ChanceSimple[];
}

export interface NumberBet {
  number: number;
  amount: number;
}

export interface ChanceSimple {
  type: string;
  amount: number;
}
