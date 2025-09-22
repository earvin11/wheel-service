import { Module } from '@nestjs/common';
import { LaunchController } from './launch.controller';
import { OperatorModule } from 'src/operators/infraestructure/operator.module';
import { CommunicationMSModule } from 'src/comunication-ms/infraestrcture/communication-ms.module';
import { LaunchUseCases } from '../application/launch.use-cases';
import { SharedCacheModule } from 'src/shared-cache/shared-cache.module';
import { RoundModule } from 'src/rounds/infraestructure/round.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { WheelModule } from 'src/wheel/infraestructure/wheel.module';

@Module({
  controllers: [LaunchController],
  exports: [],
  imports: [
    CommunicationMSModule,
    OperatorModule,
    RoundModule,
    SharedCacheModule,
    LoggerModule,
    WheelModule,
  ],
  providers: [LaunchUseCases],
})
export class LaunchModule {}
