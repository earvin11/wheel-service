import { BetFavoriteEntity } from './bet-favorite.entity';

export class BetFavorite implements BetFavoriteEntity {
  public player: string;
  public roulette: string;
  public bet: Record<string, any>;

  constructor(data: BetFavoriteEntity) {
    this.bet = data.bet;
    this.player = data.player;
    this.roulette = data.roulette;
  }
}
