import { Injectable } from '@nestjs/common';
import { DateServicePort } from '../domain/date-service.port';

@Injectable()
export class DateServiceUseCases {
  constructor(private readonly dateServicePort: DateServicePort) {}

  public getCurrentDate = (format?: string) => {
    return this.dateServicePort.getCurrentDate(format);
  };
  public getCurrentTime = (format?: string) => {
    return this.dateServicePort.getCurrentTime(format);
  };
  public getCurrentDateTime = (format?: string) => {
    return this.dateServicePort.getCurrentDateTime(format);
  };
}
