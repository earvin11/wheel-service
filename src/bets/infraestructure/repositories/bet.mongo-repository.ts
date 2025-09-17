import { InjectModel } from '@nestjs/mongoose';
import { BetEntity } from 'src/bets/domain/entities/bet.entity';
import {
  BetRepository,
  RespBetsWithEarnings,
} from 'src/bets/domain/repositories/bet.repository';
import { BetModel } from '../models/bet.model';
import { Model } from 'mongoose';

export class BetMongoRepository implements BetRepository {
  constructor(
    @InjectModel(BetModel.name)
    private readonly betModel: Model<BetModel>,
  ) {}

  async create(data: BetEntity): Promise<BetEntity> {
    throw new Error('Method not implemented.');
  }
  async createMany(data: BetEntity[]): Promise<BetEntity[]> {
    return await this.betModel.insertMany(data);
  }
  async findAll(page: number, limit: number): Promise<BetEntity[] | []> {
    return await this.betModel.find();
  }
  findById(id: string): Promise<BetEntity | null> {
    throw new Error('Method not implemented.');
  }
  findByUuid(uuid: string): Promise<BetEntity | null> {
    throw new Error('Method not implemented.');
  }
  findOneBy(filter: Record<string, any>): Promise<BetEntity | null> {
    throw new Error('Method not implemented.');
  }
  async findManyBy(
    filter: Record<string, any>,
    sort?: Record<string, 1 | -1>,
    limit?: number,
  ): Promise<BetEntity[] | []> {
    return await this.betModel.find(filter);
  }
  async findBetsWinnerWithEarningsGroupPlayer(
    roundUuid: string,
  ): Promise<RespBetsWithEarnings[] | []> {
    return await this.betModel.aggregate([
      {
        $match: {
          roundUuid,
          isWinner: true,
        },
      },
      {
        $project: {
          playerUuid: 1,
          amountPayout: 1,
          type: 1,
          value: 1,
          amount: 1,
          betReference: 1,
          operatorUuid: 1,
          playerWalletId: 1,
          currency: 1,
          gameUuid: 1,
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: '$playerUuid',
          totalWinnings: { $sum: '$amountPayout' },
          betWinCount: { $sum: 1 },
          operatorUuid: { $first: '$operatorUuid' },
          betReference: { $first: '$betReference' },
          playerWalletId: { $first: '$playerWalletId' },
          currency: { $first: '$currency' },
          gameUuid: { $first: '$gameUuid' },
          createdAt: { $first: '$createdAt' },
          bets: {
            $push: {
              type: '$type',
              value: '$value',
              amount: '$amount',
              amountPayout: '$amountPayout',
            },
          },
        },
      },
    ]);
  }
  update(id: string, data: Partial<BetEntity>): Promise<BetEntity | null> {
    throw new Error('Method not implemented.');
  }
  async updateByUuid(
    uuid: string,
    data: Partial<BetEntity>,
  ): Promise<BetEntity | null> {
    return await this.betModel.findOneAndUpdate({ uuid }, data, { new: true });
  }
  async updateMany(
    filter: Record<string, any>,
    fields: Record<string, any>,
  ): Promise<any> {
    return await this.betModel.updateMany(filter, fields);
  }
  remove(id: string): Promise<BetEntity | null> {
    throw new Error('Method not implemented.');
  }
}
