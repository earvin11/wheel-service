import { Module } from '@nestjs/common';
import { DateServicePortDayJs } from './date-service.port';
import { DateServiceUseCases } from '../application/date-service.use-cases';
import { DateServicePort } from '../domain/date-service.port';
@Module({
  imports: [],
  controllers: [],
  providers: [
    DateServicePortDayJs,
    DateServiceUseCases,
    {
      provide: DateServicePort,
      useExisting: DateServicePortDayJs,
    },
  ],
  exports: [DateServiceUseCases],
})
export class DateServiceModule {}
