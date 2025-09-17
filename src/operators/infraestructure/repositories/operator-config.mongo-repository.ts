import { InjectModel } from '@nestjs/mongoose';
import { OperatorConfigEntity } from 'src/operators/domain/entites/operator-config.entity';
import { OperatorConfigRepository } from 'src/operators/domain/repositories/operator-config.repository';
import { OperatorConfig } from '../models/operator-config.model';
import { Model } from 'mongoose';

export class OperatorConfigMongoRepository implements OperatorConfigRepository {
  constructor(
    @InjectModel(OperatorConfig.name)
    private readonly operatorConfigModel: Model<OperatorConfig>,
  ) {}
  async create(data: OperatorConfigEntity): Promise<OperatorConfigEntity> {
    const resp = await this.operatorConfigModel.create(data);
    return await resp.save();
  }
  findAll(): Promise<OperatorConfigEntity[] | []> {
    throw new Error('Method not implemented.');
  }
  async findByOperator(
    operatorId: string,
  ): Promise<OperatorConfigEntity | null> {
    return await this.operatorConfigModel.findOne({ operator: operatorId });
  }
  async updateByOperator(
    operatorId: string,
    data: Partial<OperatorConfigEntity>,
  ): Promise<OperatorConfigEntity | null> {
    return await this.operatorConfigModel.findOneAndUpdate(
      { operator: operatorId },
      data,
      { new: true },
    );
  }
}
