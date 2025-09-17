import { Injectable } from '@nestjs/common';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigEntity } from '../domain/entites/operator-config.entity';
import { OperatorConfig } from '../domain/implementations/operator-config.value';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class OperatorConfigUseCases {
  constructor(
    private readonly operatorConfigRepository: OperatorConfigRepository,
    private readonly logger: LoggerPort,
  ) {}

  public create = async (data: OperatorConfigEntity) => {
    try {
      const operatorExists = await this.findByOperator(data.operator);
      if (operatorExists)
        return await this.updateByOperator(operatorExists.operator, data);

      const newData = new OperatorConfig(data);
      return await this.operatorConfigRepository.create(newData);
    } catch (error) {
      this.logger.error('Error in OperatorConfigUseCases.create', error.stack);
      throw error;
    }
  };

  public findByOperator = async (operatorId: string) => {
    try {
      return await this.operatorConfigRepository.findByOperator(operatorId);
    } catch (error) {
      this.logger.error(
        'Error in OperatorConfigUseCases.findByOperator',
        error.stack,
      );
      throw error;
    }
  };

  public updateByOperator = async (
    operatorId: string,
    data: Partial<OperatorConfigEntity>,
  ) => {
    return await this.operatorConfigRepository.updateByOperator(
      operatorId,
      data,
    );
  };
}
