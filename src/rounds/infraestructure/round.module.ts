import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { RoundModel, RoundSchema } from './models/round.model';
import { RoundMongoRepository } from './repositories/round.mongo-repository';
import { RoundRepository } from '../domain/repositories/round.repository';
import { RoundController } from './controllers/round.controller';
import { DateServiceModule } from 'src/date-service/infraestructure/date-service.module';
import { RouletteModule } from 'src/roulette/infraestructure/roulette.module';
import { EventsModule } from 'src/events/infraestructure/events.module';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { RoundQueueService } from './queues/round-queue.service';
import {
  RoundClosedProcessor,
  RoundEndProcessor,
  RoundStartProcessor,
} from './queues/processors';
import {
  ClosedRoundUseCase,
  CreateRoundUseCase,
  EndRoundUseCase,
  RoundCacheUseCases,
  RoundUseCases,
} from '../application';
import { RoundCacheRepo } from './repositories/round.cache-repository';
import { RoundCacheRepository } from '../domain/repositories/round-cache.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { HotColdNumbersUseCase } from '../application/hot-cold-numbers.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoundModel.name,
        schema: RoundSchema,
      },
    ]),
    BullModule.registerQueue(
      {
        name: QueueName.ROUND_START,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
      {
        name: QueueName.ROUND_CLOSED,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
      {
        name: QueueName.ROUND_END,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
    ),
    CacheModule.register(),
    LoggerModule,
    RouletteModule,
    DateServiceModule,
    EventsModule,
  ],
  controllers: [RoundController],
  providers: [
    RoundMongoRepository,
    RoundCacheRepo,
    RoundUseCases,
    RoundCacheUseCases,
    CreateRoundUseCase,
    ClosedRoundUseCase,
    EndRoundUseCase,
    RoundStartProcessor,
    RoundClosedProcessor,
    RoundEndProcessor,
    RoundQueueService,
    HotColdNumbersUseCase,
    {
      provide: RoundRepository,
      useExisting: RoundMongoRepository,
    },
    {
      provide: RoundCacheRepository,
      useExisting: RoundCacheRepo,
    },
  ],
  exports: [
    RoundQueueService,
    RoundCacheUseCases,
    RoundUseCases,
    HotColdNumbersUseCase,
  ],
})
export class RoundModule {}
