import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wheel, WheelSchema } from './models/wheel.model';
import { WheelMongoRepository } from './repositories/wheel.mongo-repository';
import { WheelRepository } from '../domain/repositories/wheel.repository';
import { WheelUseCases } from '../application/wheel.use-cases';
import { RouletteController } from './controllers/wheel.controller';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wheel.name,
        schema: WheelSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [RouletteController],
  providers: [
    WheelMongoRepository,
    WheelUseCases,
    {
      provide: WheelRepository,
      useExisting: WheelMongoRepository,
    },
  ],
  exports: [WheelUseCases],
})
export class WheelModule {}
