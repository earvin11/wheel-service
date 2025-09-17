import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatorLimits } from '../models/operator-limits.model';
import { OperatorLimitsEntity } from 'src/operators/domain/entites/operator-limits.entity';
import { OperatorLimitsRepository } from 'src/operators/domain/repositories/operator-limits.repsitory';

export class OperatorLimitsMongoRepository implements OperatorLimitsRepository {
  constructor(
    @InjectModel(OperatorLimits.name)
    private readonly operatorLimitsModel: Model<OperatorLimits>,
  ) {}
  async create(data: OperatorLimitsEntity): Promise<OperatorLimitsEntity> {
    const resp = await this.operatorLimitsModel.create(data);
    return await resp.save();
  }
  findAll(page: number, limit: number): Promise<OperatorLimitsEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<OperatorLimitsEntity | null> {
    throw new Error('Method not implemented.');
  }
  async findOneBy(
    filter: Record<string, any>,
  ): Promise<OperatorLimitsEntity | null> {
    return await this.operatorLimitsModel.findOne(filter);
  }
  findManyBy(
    filter: Record<string, any>,
  ): Promise<OperatorLimitsEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    data: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null> {
    throw new Error('Method not implemented.');
  }
  findOneByAndUpdate(
    filter: Record<string, any>,
    data: Partial<OperatorLimitsEntity>,
  ): Promise<OperatorLimitsEntity | null> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<OperatorLimitsEntity | null> {
    throw new Error('Method not implemented.');
  }
}
