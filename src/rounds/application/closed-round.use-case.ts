import { Injectable } from '@nestjs/common';
import { RoundUseCases } from './round.use-cases';
import { RoundCacheUseCases } from './round-cache.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { EventPublisher } from 'src/events/domain/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { sleep } from 'src/shared/helpers/sleep.helper';

@Injectable()
export class ClosedRoundUseCase {
  constructor(
    private readonly roundUseCases: RoundUseCases,
    private readonly roundCacheUseCases: RoundCacheUseCases,
    private readonly eventPublisher: EventPublisher,
    private readonly loggerPort: LoggerPort,
  ) {}
  async run(roundUuid: string) {
    try {
      //TODO:
      await sleep(23);

      const round = await this.roundUseCases.updateByUuid(roundUuid, {
        open: false,
      });
      if (!round)
        return {
          error: true,
          message: 'Error round no encontrado',
          roundUuid,
        };

      await this.roundCacheUseCases.remove(roundUuid);
      await this.roundCacheUseCases.save({
        ...round,
        open: false,
      });

      this.eventPublisher.emit(EventsEnum.ROUND_JACKPOT, roundUuid);
      return;
    } catch (error) {
      this.loggerPort.error('Error in ClosedRoundUseCase.run', error.stack);
    }
  }
}
