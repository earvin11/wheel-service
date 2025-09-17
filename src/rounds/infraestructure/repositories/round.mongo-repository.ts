import { RoundEntity } from 'src/rounds/domain/entities/round.entity';
import { RoundRepository } from '../../domain/repositories/round.repository';
import { InjectModel } from '@nestjs/mongoose';
import { RoundModel } from '../models/round.model';
import { Model } from 'mongoose';

export class RoundMongoRepository implements RoundRepository {
  constructor(
    @InjectModel(RoundModel.name)
    private readonly roundModel: Model<RoundModel>,
  ) {}

  async create(data: RoundEntity): Promise<RoundEntity> {
    const newRound = await this.roundModel.create(data);
    return await newRound.save();
  }
  async findAll(page: number, limit: number): Promise<RoundEntity[] | []> {
    return await this.roundModel.find().skip(page).limit(limit);
  }
  async findById(id: string): Promise<RoundEntity | null> {
    return await this.roundModel.findById(id);
  }
  async findByUuid(uuid: string): Promise<RoundEntity | null> {
    return await this.roundModel.findOne({ uuid });
  }
  async findOneBy(filter: Record<string, any>): Promise<RoundEntity | null> {
    return await this.roundModel.findOne(filter);
  }
  async findManyBy(
    filter: Record<string, any>,
    sort?: Record<string, 1 | -1>,
    limit?: number,
  ): Promise<RoundEntity[] | []> {
    let query = this.roundModel.find(filter);
    // Aplicar el orden si se proporciona
    if (sort) {
      query = query.sort(sort);
    }
    // Aplicar el límite si se proporciona
    if (limit) {
      query = query.limit(limit);
    }

    const data = await query.exec();
    return data;
  }
  async update(
    id: string,
    data: Partial<RoundEntity>,
  ): Promise<RoundEntity | null> {
    return await this.roundModel.findByIdAndUpdate(id, data);
  }
  async updateByUuid(
    uuid: string,
    data: Partial<RoundEntity>,
  ): Promise<RoundEntity | null> {
    return await this.roundModel.findOneAndUpdate({ uuid }, data, {
      new: true,
    });
  }
  async remove(id: string): Promise<RoundEntity | null> {
    throw new Error('Method not implemented.');
  }
  async findFilteredRounds(
    filter: Record<string, any>,
    page: number,
    limit: number,
  ): Promise<{ rounds: RoundEntity[]; total: number }> {
    throw new Error('Method not implemented.');
  }
  async findByIdNumber(identifierNumber: string): Promise<RoundEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  async findByIdNumberWithCountBets(
    identifierNumber: string,
  ): Promise<{ round: RoundEntity; totalBets: number }[] | []> {
    throw new Error('Method not implemented.');
  }
}
