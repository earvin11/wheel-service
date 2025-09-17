export interface DebitWalletRequest {
  user_id: string;
  amount: number;
  round_id: string;
  bet_id: string;
  game_id: string;
  bet_code: string;
  bet_date: Date;
  platform: string;
  currency: string;
  transactionType: 'bet';
  allow_multiple_transactions?: boolean;
}

export interface CreditWalletRequest {
  user_id: string;
  amount: number;
  round_id: string;
  bet_id: string;
  game_id: string;
  bet_code: string;
  bet_date: string;
  platform: string;
  currency: string;
  transactionType: 'credit';
}

export interface AuthPlayerGatewayResponse {
  _id: string;
  operatorUuid: string;
  status: boolean;
  isAdmin: boolean;
  isPhysic: boolean;
  board: boolean;
  currency: { id: string; short: string };
  tokenWallet: string;
  userId: string;
  username: string;
  lastBalance: string;
  first_name: string;
  last_name: string;
  available_balance: string;
  WL: string;
  lastConnection: Date;
  operator: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DebitWalletResponse {
  ok: boolean;
  msg: string;
  lastBalance: string;
}

// export interface PlayerWalletResponse {
//   ok: boolean;
//   mensaje: string;
//   userId: string;
//   username: string;
//   lastBalance: string;
//   country_code: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   currency: string;
//   available_balance: string;
//   WL?: string;
//   msg?: string;
// }
