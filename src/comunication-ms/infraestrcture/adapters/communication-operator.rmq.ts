import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameEventsMS } from 'src/comunication-ms/domain/enums/name-events.enum';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import {
  CommunicationOperatorPort,
  OperatorReponse,
} from 'src/comunication-ms/domain/ports/communication-operator.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

export class CommunicationOperatorRMQ implements CommunicationOperatorPort {
  constructor(
    @Inject(NameServices.OPERATOR_SERVICE)
    private readonly client: ClientProxy,
    private readonly loggerPort: LoggerPort,
  ) {}

  async findById(id: string): Promise<OperatorReponse> {
    try {
      const response = await lastValueFrom(
        this.client.send(NameEventsMS.OPERATOR_BY_ID, { id }),
      );
      return response;
    } catch (error) {
      this.loggerPort.error('Error OPERATOR BY ID: ', error);
      throw new HttpException(
        'OPERATOR BY ID processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
