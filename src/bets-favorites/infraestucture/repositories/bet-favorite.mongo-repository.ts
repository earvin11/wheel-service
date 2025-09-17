import { InjectModel } from '@nestjs/mongoose';
import { BetFavoriteEntity } from 'src/bets-favorites/domain/bet-favorite.entity';
import { BetFavoriteRepository } from 'src/bets-favorites/domain/bet-favorite.repository';
import { BetFavoriteModel } from '../models/bet-favorite.model';
import { Model } from 'mongoose';

export class BetFavoriteMongoRepository implements BetFavoriteRepository {
  constructor(
    @InjectModel(BetFavoriteModel.name)
    private readonly betFavoriteModel: Model<BetFavoriteModel>,
  ) {}

  async create(data: BetFavoriteEntity): Promise<BetFavoriteEntity> {
    const newData = await this.betFavoriteModel.create(data);
    return await newData.save();
  }
  async update(
    id: string,
    dataToUpdate: Partial<BetFavoriteEntity>,
  ): Promise<BetFavoriteEntity | null> {
    return await this.betFavoriteModel.findByIdAndUpdate(id, dataToUpdate);
  }
  async remove(id: string): Promise<void> {
    await this.betFavoriteModel.findByIdAndDelete(id);
  }
  async findBetsByPlayer(player: string): Promise<BetFavoriteEntity[] | []> {
    return await this.betFavoriteModel.find({ player });
  }
}
