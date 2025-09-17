import { Injectable } from '@nestjs/common';
import { DateServicePort } from '../domain/date-service.port';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class DateServicePortDayJs implements DateServicePort {
  getCurrentDate(format = 'DD-MM-YYYY'): string {
    return dayjs().utc().format(format);
  }

  getCurrentTime(format = 'HH-mm-ss'): string {
    return dayjs().utc().format(format);
  }

  getCurrentDateTime(format = 'DD-MM-YYYY HH-mm-ss'): string {
    return dayjs().utc().format(format);
  }
}
