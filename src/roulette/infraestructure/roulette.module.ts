import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Roulette, RouletteSchema } from './models/roulette.model';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteController } from './controllers/roulette.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Roulette.name,
        schema: RouletteSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [RouletteController],
  providers: [
    RouletteMongoRepository,
    RouletteUseCases,
    {
      provide: RouletteRepository,
      useExisting: RouletteMongoRepository,
    },
  ],
  exports: [RouletteUseCases],
})
export class RouletteModule {}
