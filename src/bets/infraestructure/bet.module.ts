import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BetModel, BetSchema } from './models/bet.model';
import { BetMongoRepository } from './repositories/bet.mongo-repository';
import { BetRepository } from '../domain/repositories/bet.repository';
import { BetController } from './controllers/bet.controller';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { PayBetsProcessor } from './queues/processors/pay-bets.processor';
import { EventsModule } from 'src/events/infraestructure/events.module';
import { BetQueueService } from './queues/bets-queue.service';
import { OperatorModule } from 'src/operators/infraestructure/operator.module';
import { CreateBetsUseCase, PayBetsUseCase } from '../application';
import { TransactionModule } from 'src/transactions/infraestructure/transaction.module';
import { BetUseCases } from '../application/bet.use-cases';
import { CreateBetProcessor } from './queues/processors/create-bet.processor';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { CommunicationMSModule } from 'src/comunication-ms/infraestrcture/communication-ms.module';
// import { RoundModule } from 'src/rounds/infraestructure/round.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BetModel.name,
        schema: BetSchema,
      },
    ]),
    BullModule.registerQueue(
      { name: QueueName.PAY_BETS },
      { name: QueueName.BET },
    ),
    EventsModule,
    OperatorModule,
    TransactionModule,
    LoggerModule,
    CommunicationMSModule,
    // RoundModule
  ],
  controllers: [BetController],
  providers: [
    BetMongoRepository,
    BetUseCases,
    CreateBetsUseCase,
    PayBetsUseCase,
    PayBetsProcessor,
    CreateBetProcessor,
    BetQueueService,
    {
      provide: BetRepository,
      useExisting: BetMongoRepository,
    },
  ],
  exports: [BetUseCases, CreateBetsUseCase, BetQueueService],
})
export class BetModule {}
