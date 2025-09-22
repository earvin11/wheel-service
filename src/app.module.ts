import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
// Modules
import { RoundModule } from './rounds/infraestructure/round.module';
import { DateServiceModule } from './date-service/infraestructure/date-service.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WsServerModule } from './ws-server/infraestructure/ws-server.module';
import { OperatorModule } from './operators/infraestructure/operator.module';
import { BetModule } from './bets/infraestructure/bet.module';
import { TransactionModule } from './transactions/infraestructure/transaction.module';
import { LoggerModule } from './logging/infraestructure/logger.module';
import { JackpotModule } from './jackpot/infraestructure/jackpot.module';
import { CommunicationMSModule } from './comunication-ms/infraestrcture/communication-ms.module';
import { LaunchModule } from './launch/infraestructure/launch.module';
// import { CacheModule } from '@nestjs/cache-manager';
import { SharedCacheModule } from './shared-cache/shared-cache.module';
import { BetFavoriteModule } from './bets-favorites/infraestucture/bet-favorite.module';
import { ReportsModule } from './reports/infraestructure/reports.module';
import { WheelModule } from './wheel/infraestructure/wheel.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.dbUri, {
      dbName: envs.dbName,
    }),
    BullModule.forRoot({
      connection: {
        host: envs.redisUri,
        port: envs.redisPort,
        password: envs.redisPassword,
      },
    }),
    // CacheModule.register(),
    EventEmitterModule.forRoot(),
    BetModule,
    BetFavoriteModule,
    CommunicationMSModule,
    DateServiceModule,
    LaunchModule,
    LoggerModule,
    JackpotModule,
    OperatorModule,
    ReportsModule,
    RoundModule,
    SharedCacheModule,
    TransactionModule,
    WheelModule,
    WsServerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
