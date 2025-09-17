import { Module } from '@nestjs/common';
import { WsGateway } from './ws-gateway';
import { BetModule } from 'src/bets/infraestructure/bet.module';
import { RoundModule } from 'src/rounds/infraestructure/round.module';
import { CommunicationMSModule } from 'src/comunication-ms/infraestrcture/communication-ms.module';

@Module({
  providers: [WsGateway],
  imports: [RoundModule, BetModule, CommunicationMSModule],
  exports: [WsGateway],
})
export class WsServerModule {}
