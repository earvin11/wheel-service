import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameEventsMS } from 'src/comunication-ms/domain/enums/name-events.enum';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import {
  CommunicationCurrencyPort,
  CurrencyDataResponse,
} from 'src/comunication-ms/domain/ports/communiaction-currency.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

export class CommunicationCurrencyRMQ implements CommunicationCurrencyPort {
  constructor(
    @Inject(NameServices.CURRENCY_SERVICE)
    private readonly client: ClientProxy,
    private readonly loggerPort: LoggerPort,
  ) {}

  async findByISOCode(isoCode: string): Promise<CurrencyDataResponse> {
    try {
      return await lastValueFrom(
        this.client.send(
          { cmd: NameEventsMS.GET_CURRENCY_BY_ISO_CODE },
          isoCode,
        ),
      );
    } catch (error) {
      this.loggerPort.log('Error CURRENCY BY ISO CODE: ', error);
      throw new HttpException(
        'CURRENCY BY ISO CODE processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
