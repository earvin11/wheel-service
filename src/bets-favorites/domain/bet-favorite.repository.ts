import { BetFavoriteEntity } from './bet-favorite.entity';

export abstract class BetFavoriteRepository {
  abstract create(data: BetFavoriteEntity): Promise<BetFavoriteEntity>;
  abstract update(
    id: string,
    dataToUpdate: Partial<BetFavoriteEntity>,
  ): Promise<BetFavoriteEntity | null>;
  abstract remove(id: string): Promise<void>;
  abstract findBetsByPlayer(player: string): Promise<BetFavoriteEntity[] | []>;
}
