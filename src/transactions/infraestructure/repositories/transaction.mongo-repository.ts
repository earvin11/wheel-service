import { InjectModel } from '@nestjs/mongoose';
import { TransactionModel } from '../models/transaction.model';
import { Model, PipelineStage } from 'mongoose';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.repository';
import { TransactionEntity } from 'src/transactions/domain/entities/transaction.entity';
import { formatDate } from 'src/shared/helpers/format-date.helper';

export class TransactionMongoRepository implements TransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionModel>,
  ) {}
  async create(data: TransactionEntity): Promise<TransactionEntity> {
    const newData = await this.transactionModel.create(data);
    return await newData.save();
  }
  findAll(): Promise<TransactionEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  findByUuid(uuid: string): Promise<TransactionEntity | null> {
    throw new Error('Method not implemented.');
  }
  findOneBy(filter: Record<string, any>): Promise<TransactionEntity | null> {
    throw new Error('Method not implemented.');
  }
  findManyBy(filter: Record<string, any>): Promise<TransactionEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  remove(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async historyPlayer(data: {
    player: string;
    search?: string;
    start_date?: string;
    end_date?: string;
    skip?: number;
    limit?: number;
  }): Promise<any> {
    const { player, search, skip = 0, start_date, end_date, limit = 10 } = data;

    const filter: any = {
      playerUuid: player,
      type: 'debit',
      amount: {
        $ne: 0,
      },
    };

    if (end_date && start_date) {
      filter['createdAt'] = {
        $lte: formatDate(start_date, end_date).end_date,
        $gte: formatDate(start_date, end_date).start_date,
      };
    }

    if (search) {
      filter['$or'] = [
        { amount: Number(search) },
        { 'round.identifierNumber': Number(search) }, //TODO: revisar identifierNumber en ronda
      ];
    }

    const pipeline: PipelineStage[] = [
      { $match: { ...filter } },
      {
        $lookup: {
          from: 'rounds',
          localField: 'roundId',
          foreignField: '_id',
          as: 'round',
        },
      },
      { $unwind: '$round' },
      {
        $project: {
          'round._id': 1,
          'round.result': 1,
          'round.jackpot_values': 1,
          'round.identifierNumber': 1,
          createdAt: 1,
          type: 1,
          amount: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: +skip },
      { $limit: +limit },
    ];

    return await this.transactionModel.aggregate(pipeline);
  }
}
