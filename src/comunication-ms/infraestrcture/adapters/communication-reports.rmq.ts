import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameEventsMS } from 'src/comunication-ms/domain/enums/name-events.enum';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import {
  CommunicationReportsPort,
  CreateReportInterface,
} from 'src/comunication-ms/domain/ports/communication-reports.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

export class CommunicationReportsRMQ implements CommunicationReportsPort {
  constructor(
    @Inject(NameServices.REPORT_SERVICE)
    private readonly client: ClientProxy,
    private readonly loggerPort: LoggerPort,
  ) {}
  async create(data: CreateReportInterface): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.client.send(NameEventsMS.CREATE_REPORT, data),
      );

      return response;
    } catch (error) {
      //TODO: evaluar que tipo de error regresar
      this.loggerPort.error('CREATE REPORT processing failed', error);
      throw new HttpException(
        'CREATE REPORT processing failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
