import { Injectable } from '@nestjs/common';
import { OperatorConfigCacheRepository } from '../domain/repositories/operator-config.cache-repository';
import { OperatorConfigEntity } from '../domain/entites/operator-config.entity';

@Injectable()
export class OperatorConfigCacheUseCases {
  constructor(
    private readonly operatorConfigCacheRepository: OperatorConfigCacheRepository,
  ) {}

  public save = async (data: OperatorConfigEntity) => {
    return await this.operatorConfigCacheRepository.save(data);
  };

  public findByOperator = async (operatorId: string) => {
    return await this.operatorConfigCacheRepository.findByOperator(operatorId);
  };

  public remove = async (operatorId: string) => {
    return await this.operatorConfigCacheRepository.remove(operatorId);
  };
}
