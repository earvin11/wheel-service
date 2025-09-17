import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { Transaction } from '../domain/implementations/transaction.value';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class TransactionUseCases {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly loggerPort: LoggerPort,
  ) {}

  public create = async (data: TransactionEntity) => {
    try {
      const newData = new Transaction(data);
      return await this.transactionRepository.create(newData);
    } catch (error) {
      this.loggerPort.error('Error in TransactionUseCases.create', error.stack);
      throw error;
    }
  };
}
