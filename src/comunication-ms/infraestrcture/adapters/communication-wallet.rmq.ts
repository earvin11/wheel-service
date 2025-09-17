import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameEventsMS } from 'src/comunication-ms/domain/enums/name-events.enum';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import {
  DebitWalletRequest,
  CreditWalletRequest,
  AuthPlayerGatewayResponse,
} from 'src/comunication-ms/domain/interfaces/wallet.interfaces';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';

export class CommunicationWalletRMQ implements CommunicationWalletPort {
  constructor(
    @Inject(NameServices.PLAYER_SERVCE)
    private readonly client: ClientProxy,
  ) {}

  async debit<T>(operatorId: string, data: DebitWalletRequest): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.client.send(NameEventsMS.WALLET_DEBIT, { operatorId, data }),
      );
      return response;
    } catch (error) {
      if (error?.response?.statusCode)
        // Relanzar el error con su status original
        throw new HttpException(
          error?.response?.message || 'Bad request',
          error.response.statusCode,
        );

      throw new HttpException(
        'DEBIT processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async credit<T>(operatorId: string, data: CreditWalletRequest): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.client.send(NameEventsMS.WALLET_CREDIT, { operatorId, data }),
      );
      return response;
    } catch (error) {
      if (error?.response?.statusCode)
        // Relanzar el error con su status original
        throw new HttpException(
          error?.response?.message || 'Bad request',
          error.response.statusCode,
        );

      throw new HttpException(
        'CREDIT processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async auth(
    operatorId: string,
    token: string,
  ): Promise<AuthPlayerGatewayResponse> {
    try {
      const response = await lastValueFrom(
        this.client.send(NameEventsMS.WALLET_AUTH, { operatorId, token }),
      );
      return response;
    } catch (error) {
      if (error?.response?.statusCode)
        // Relanzar el error con su status original
        throw new HttpException(
          error?.response?.message || 'Bad request',
          error.response.statusCode,
        );

      throw new HttpException(
        'AUTH processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
