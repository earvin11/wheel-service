export interface BetEntity {
  roundUuid: string;
  playerUuid: string;
  playerWalletId: string;
  currency: string;
  gameUuid: string;
  operatorUuid: string;
  value: number;
  amount: number;
  betReference: string; // Mismas apuestas del jugador en la ronda referenciadas con un uuid para enviarlo a wallet
  isWinner?: boolean;
  amountPayout?: number;
  uuid?: string;
}
