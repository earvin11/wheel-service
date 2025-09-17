import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  //ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BetQueueService } from 'src/bets/infraestructure/queues/bets-queue.service';
import { RoundCacheUseCases, RoundUseCases } from 'src/rounds/application';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { SocketEventsEnum } from 'src/shared/enums/socket-events.enum';
import { getEntityFromCacheOrDb } from 'src/shared/helpers/get-entity-from-cache-or-db.helper';
import { envs } from 'src/config/envs';
// import { RoundQueueService } from 'src/rounds/infraestructure/queues/round-queue.service';
import { CommunicationMsGamesQueuePort } from 'src/comunication-ms/domain/ports/communication-ms-games-queue.port';
import { SendEventsRoundAdapter } from './adapters/send-events.adapter';
@WebSocketGateway({
  namespace: envs.pathWs,
  // path: envs.pathWs,
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;
  private logger = new Logger('WsGateway');
  private connectedClients = new Set<string>();

  constructor(
    private readonly betsQueueService: BetQueueService,
    private readonly roundUseCases: RoundUseCases,
    private readonly roundCacheUseCases: RoundCacheUseCases,
    private readonly communicationMsGamesQueuePort: CommunicationMsGamesQueuePort,
    // private readonly roundQueueService: RoundQueueService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('NEW CLIENT CONECTED');
    this.connectedClients.add(client.id);
    this.logger.log(
      `Cliente conectado: ${client.id}. Total conectados: ${this.connectedClients.size}`,
    );
  }
  handleDisconnect(client: any) {
    this.logger.log('CLIENT DISCONECTED');
    this.connectedClients.delete(client.id);
    this.logger.log(
      `Cliente desconectado: ${client.id}, Total conectados: ${this.connectedClients.size}`,
    );
  }

  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  //TODO: betEvent
  @SubscribeMessage(SocketEventsEnum.BET)
  async handleBet(@MessageBody() data: any) {
    try {
      const round = await getEntityFromCacheOrDb(
        () => this.roundCacheUseCases.findByUuid(data.round),
        () => this.roundUseCases.findByUuid(data.round),
        (roundDb) => this.roundCacheUseCases.save(roundDb),
      );

      // Validaciones de ronda
      if (!round) {
        this.server.emit(SocketEventsEnum.BET_ERROR, {
          error: 'Round not found',
        });
        return;
      }
      if (!round.open) {
        this.server.emit(SocketEventsEnum.BET_ERROR, {
          error: 'Round closed',
        });
        return;
      }

      await this.betsQueueService.createBet(data);
      return;
    } catch (error) {
      this.server.emit(SocketEventsEnum.BET_ERROR, {
        msg: 'Internal server error',
      });
      return;
    }
  }

  // @SubscribeMessage(SocketEventsEnum.WINNER)
  // winner(playerId: string, roundUuid: string) {

  // }

  @OnEvent(EventsEnum.BET_ERROR)
  betError(payload: any) {
    this.server.emit(SocketEventsEnum.BET_ERROR, JSON.stringify(payload));
    return;
  }

  @OnEvent(EventsEnum.BET_SUCCESS)
  betSuccess(payload: any) {
    this.server.emit(SocketEventsEnum.BET_SUCCESS, JSON.stringify(payload));
    return;
  }

  @OnEvent(EventsEnum.ROUND_START)
  startRound(payload: any) {
    const dataToEmit = {
      msg: payload.msg,
      round: {
        ...payload.round,
      },
      current_users: this.connectedClients.size,
    };

    const dataToSocket = new SendEventsRoundAdapter(
      dataToEmit,
    ).getRoundStartForSocket();
    this.server.emit(
      SocketEventsEnum.ROUND_START,
      JSON.stringify(dataToSocket),
    );

    const dataRabbit = new SendEventsRoundAdapter(
      dataToEmit,
    ).getRoundDataForRabbit();
    this.communicationMsGamesQueuePort.sendRoundEvent(dataRabbit);
    return;
  }

  @OnEvent(EventsEnum.ROUND_END)
  endRound(payload: any) {
    const dataToEmit = {
      ...payload,
      current_users: this.connectedClients.size,
    };

    const dotaToSocket = new SendEventsRoundAdapter(
      dataToEmit,
    ).getRoundEndForSocket();
    this.server.emit(SocketEventsEnum.ROUND_END, JSON.stringify(dotaToSocket));

    const dataRabbit = new SendEventsRoundAdapter(
      dataToEmit,
    ).getRoundDataForRabbit();
    this.communicationMsGamesQueuePort.sendRoundEvent(dataRabbit);

    // //Emular rondas
    // this.roundQueueService.createRound({
    //   ID_Ronda: "4",
    //   ID_Ruleta: "1",
    //   Fecha: "Thu Feb 20 2025 08:51:44 GMT-0400",
    //   Giro: "0",
    //   Rpm: "22",
    //   Error: "0",
    //   Resultado: "99"
    // })
    return;
  }

  @OnEvent(EventsEnum.EMIT_JACKPOT)
  jackpot(payload: any) {
    const dataToEmit = {
      msg: payload.msg,
      round: {
        ...payload.round,
      },
      current_users: this.connectedClients.size,
    };

    const dataToSocket = new SendEventsRoundAdapter(
      dataToEmit,
    ).getJackpotForSocket();

    this.server.emit(
      SocketEventsEnum.ROUND_JACKPOT_VALUES,
      JSON.stringify(dataToSocket),
    );

    const dataRabbit = new SendEventsRoundAdapter(
      dataToEmit,
    ).getRoundWithJackpotForRabbit();
    this.communicationMsGamesQueuePort.sendRoundEvent(dataRabbit);

    // // Emular resultado
    // this.roundQueueService.endRound({
    //   ID_Ronda: "4",
    //   ID_Ruleta: "1",
    //   Fecha: "Thu Feb 20 2025 08:51:44 GMT-0400",
    //   Giro: "0",
    //   Rpm: "22",
    //   Error: "0",
    //   Resultado: String(Math.floor(Math.random() * 37))
    // }, 5)
    return;
  }

  // @OnEvent(EventsEnum.ROUND_BET_TIME)
  // endBetTimeRound(payload: any) {
  //   this.server.emit(SocketEventsEnum.ROUND_BET_TIME, JSON.stringify(payload));
  //   return;
  // }
}
