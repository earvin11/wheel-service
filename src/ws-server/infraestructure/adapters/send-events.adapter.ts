interface DataInput {
  msg: string;
  current_users: number;
  round: RoundDataInput;
}

interface RoundDataInput {
  round: string;
  gameId: string;
  jackpot_values?: any;
  start_date?: string;
  end_date?: string;
  ID_Ronda?: string;
  identifierNumber?: string;
  crupier?: string;
  result?: number;
}

interface SendEventsRoundRabbit {
  msg: string;
  round: RoundEventRabbit;
  id_game: string;
}

interface RoundEventRabbit {
  // ID_Ronda: string;
  // identifierNumber: string;
  round: string;
  // id_game: string;
  current_users: number;
  jackpot_values?: any[];
  result?: number;
}

interface RoundStartSocket {
  msg: string;
  current_users: number;
  gameId: string;
  round: {
    ID_Ronda: string;
    end_date: string;
    identifierNumber: string;
    round: string;
    start_date: string;
    crupier?: string;
  };
}

interface JackpotSocket {
  msg: string;
  round: string;
  current_users: number;
  gameId: string;
  'jackpot-values': any[];
}

interface RoundEndSocket {
  msg: string;
  result: number;
  round: string;
  gameId: string;
  current_users: number;
}

export class SendEventsRoundAdapter {
  public msg: string;
  public round: string;
  public id_game: string;
  public current_users: number;
  public jackpot_values?: any[];
  public start_date?: string;
  public end_date?: string;
  public ID_Ronda?: string;
  public identifierNumber?: string;
  public crupier?: string;
  public result?: number;

  constructor(data: DataInput) {
    this.msg = data.msg;
    this.current_users = data.current_users ?? 0;
    this.id_game = data.round.gameId;
    this.round = data.round.round;
    this.jackpot_values = data.round.jackpot_values;
    this.ID_Ronda = data.round.ID_Ronda;
    this.crupier = data.round.crupier;
    this.end_date = data.round.end_date;
    this.identifierNumber = data.round.identifierNumber;
    this.jackpot_values = data.round.jackpot_values;
    this.result = data.round.result;
    this.start_date = data.round.start_date;
  }

  getRoundDataForRabbit(): SendEventsRoundRabbit {
    return {
      msg: this.msg,
      id_game: this.id_game,
      round: {
        current_users: this.current_users,
        round: this.round,
        ...(this.result != null && { result: this.result })
      },
    };
  }

  getRoundWithJackpotForRabbit(): SendEventsRoundRabbit {
    return {
      msg: this.msg,
      id_game: this.id_game,
      round: {
        current_users: this.current_users,
        round: this.round,
        jackpot_values: this.jackpot_values,
      },
    };
  }

  getRoundStartForSocket(): RoundStartSocket {
    return {
      current_users: this.current_users,
      gameId: this.id_game,
      msg: this.msg,
      round: {
        end_date: this.end_date!,
        start_date: this.start_date!,
        ID_Ronda: this.ID_Ronda!,
        identifierNumber: this.identifierNumber!,
        round: this.round,
        crupier: this.crupier!,
      },
    };
  }

  getRoundEndForSocket(): RoundEndSocket {
    return {
      current_users: this.current_users,
      gameId: this.id_game,
      msg: this.msg,
      result: this.result!,
      round: this.round,
    };
  }

  getJackpotForSocket(): JackpotSocket {
    return {
      'jackpot-values': this.jackpot_values!,
      current_users: this.current_users,
      gameId: this.id_game,
      msg: this.msg,
      round: this.round,
    };
  }
}
