import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { NameEventsMS } from "src/comunication-ms/domain/enums/name-events.enum";
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import { CommunicationMsGamesQueuePort } from 'src/comunication-ms/domain/ports/communication-ms-games-queue.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class CommunicationMsGamesQueueRMQ
  implements CommunicationMsGamesQueuePort
{
  constructor(
    @Inject(NameServices.MS_GAMES_QUEUE)
    private readonly client: ClientProxy,
    private readonly loggerPort: LoggerPort,
  ) {}

  async sendRoundEvent(data: any): Promise<void> {
    this.client.emit('ms_games_queque', data);
    try {
    } catch (error) {
      this.loggerPort.error(`Error send roundEvent: `, error);
    }
  }
}
