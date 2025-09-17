export enum SocketEventsEnum {
  ROUND_CLOSE = 'round:close',
  ROUND_START = 'round:start',
  ROUND_END = 'round:end',
  ROUND_BET_TIME = 'round:end-bet-time',
  ROUND_JACKPOT_VALUES = 'jackpot-values',

  BET = 'bet',
  BET_SUCCESS = 'bet:success',
  BET_ERROR = 'bet:err',

  WINNER = 'winner',
}
