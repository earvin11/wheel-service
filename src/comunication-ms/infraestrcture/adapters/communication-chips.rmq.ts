import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameEventsMS } from 'src/comunication-ms/domain/enums/name-events.enum';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import {
  ChipsByOperatorAndCurrencyResp,
  CommunicationChipsPort,
} from 'src/comunication-ms/domain/ports/communication-chips.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

export class CommunicationChipsRMQ implements CommunicationChipsPort {
  constructor(
    @Inject(NameServices.OPERATOR_SERVICE)
    private readonly client: ClientProxy,
    private readonly loggerPort: LoggerPort,
  ) {}

  async findByOperatorAndCurrency(
    operator: string,
    currency: string,
  ): Promise<ChipsByOperatorAndCurrencyResp> {
    try {
      return await lastValueFrom(
        this.client.send(
          { cmd: NameEventsMS.CHIPS_BY_OPERATOR_AND_CURRENCY },
          { operatorId: operator, currencyId: currency },
        ),
      );
    } catch (error) {
      this.loggerPort.error('CHIPS BY OPERATOR ERROR: ', error);
      throw new HttpException(
        'GET CHIPS BY OPERATOR AND CURRENCY FAILED',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
