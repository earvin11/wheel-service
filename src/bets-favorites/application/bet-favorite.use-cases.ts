import { Injectable } from '@nestjs/common';
import { BetFavoriteEntity } from '../domain/bet-favorite.entity';
import { BetFavoriteRepository } from '../domain/bet-favorite.repository';
import { BetFavorite } from '../domain/bet-favorite.value';

@Injectable()
export class BetFavoriteUseCases {
  constructor(private readonly betFavoriteRepository: BetFavoriteRepository) {}

  public async create(data: BetFavoriteEntity) {
    const newData = new BetFavorite(data);
    return await this.betFavoriteRepository.create(newData);
  }

  public async update(id: string, dataToUpdate: Partial<BetFavoriteEntity>) {
    const data = await this.betFavoriteRepository.update(id, dataToUpdate);
    return data;
  }

  public async remove(id: string) {
    return await this.betFavoriteRepository.remove(id);
  }

  public async findBetsByPlayer(player: string) {
    return await this.betFavoriteRepository.findBetsByPlayer(player);
  }
}
