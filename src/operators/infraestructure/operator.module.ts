import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import {
  OperatorConfig,
  OperatorConfigSchema,
} from './models/operator-config.model';
import { OperatorConfigMongoRepository } from './repositories/operator-config.mongo-repository';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigController } from './controllers/operator-config.controller';
import { OperatorConfigUseCases } from '../application/operator-config.use-cases';
import { OperatorConfigCacheRepo } from './repositories/operator-config.cache-repo';
import { OperatorConfigCacheUseCases } from '../application/operator-config-cache.use-cases';
import { OperatorConfigCacheRepository } from '../domain/repositories/operator-config.cache-repository';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { OperatorLimitsController } from './controllers/operator-limits.controller';
import {
  OperatorLimits,
  OperatorLimitsSchema,
} from './models/operator-limits.model';
import { OperatorLimitsUseCases } from '../application/operator-limits.use-cases';
import { OperatorLimitsMongoRepository } from './repositories/operator-limits.mongo-repository';
import { OperatorLimitsRepository } from '../domain/repositories/operator-limits.repsitory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatorConfig.name,
        schema: OperatorConfigSchema,
      },
      {
        name: OperatorLimits.name,
        schema: OperatorLimitsSchema,
      },
    ]),
    CacheModule.register(),
    LoggerModule,
  ],
  controllers: [OperatorConfigController, OperatorLimitsController],
  providers: [
    OperatorConfigMongoRepository,
    OperatorLimitsMongoRepository,
    OperatorConfigCacheRepo,
    OperatorConfigUseCases,
    OperatorConfigCacheUseCases,
    OperatorLimitsUseCases,
    {
      provide: OperatorConfigRepository,
      useExisting: OperatorConfigMongoRepository,
    },
    {
      provide: OperatorConfigCacheRepository,
      useExisting: OperatorConfigCacheRepo,
    },
    {
      provide: OperatorLimitsRepository,
      useExisting: OperatorLimitsMongoRepository,
    },
  ],
  exports: [
    OperatorConfigUseCases,
    OperatorConfigCacheUseCases,
    OperatorLimitsUseCases,
  ],
})
export class OperatorModule {} //TODO: cambiar nombre OperatorConfig
