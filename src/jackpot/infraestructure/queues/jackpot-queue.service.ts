import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bullmq';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Injectable()
export class JackpotQueueService {
  constructor(
    @InjectQueue(QueueName.CALCULATE_JACKPOT)
    private readonly calculateJackpot: Queue,
  ) {}

  @OnEvent(EventsEnum.ROUND_JACKPOT)
  async generateJackpot(jobData: any) {
    return await this.calculateJackpot.add(
      QueueName.CALCULATE_JACKPOT,
      jobData,
    );
  }
}
