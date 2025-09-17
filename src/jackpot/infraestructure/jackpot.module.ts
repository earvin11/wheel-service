import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BetModule } from 'src/bets/infraestructure/bet.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RoundModule } from 'src/rounds/infraestructure/round.module';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { GenerateJackpotProcessor } from './queues/processors/generate-jackpot.processor';
import { JackpotQueueService } from './queues/jackpot-queue.service';
import { CreateJackpoUseCase } from '../application/create-jackpot.use-case';
import { EventsModule } from 'src/events/infraestructure/events.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueName.CALCULATE_JACKPOT }),
    RoundModule,
    BetModule,
    EventsModule,
    LoggerModule,
  ],
  providers: [
    CreateJackpoUseCase,
    GenerateJackpotProcessor,
    JackpotQueueService,
  ],
  exports: [JackpotQueueService],
})
export class JackpotModule {}
