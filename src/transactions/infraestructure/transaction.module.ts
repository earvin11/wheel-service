import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionModel,
  TransactionSchema,
} from './models/transaction.model';
import { TransactionMongoRepository } from './repositories/transaction.mongo-repository';
import { TransactionUseCases } from '../application/transaction.use-cases';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TransactionModel.name,
        schema: TransactionSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [],
  providers: [
    TransactionMongoRepository,
    TransactionUseCases,
    {
      provide: TransactionRepository,
      useExisting: TransactionMongoRepository,
    },
  ],
  exports: [TransactionUseCases],
})
export class TransactionModule {}
