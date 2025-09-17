import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsEnum } from 'src/shared/enums/events.enum';

@Injectable()
export class RoundQueueService {
  constructor(
    @InjectQueue(QueueName.ROUND_START) private readonly roundStartQueue: Queue,
    @InjectQueue(QueueName.ROUND_CLOSED)
    private readonly roundClosedQueue: Queue,
    @InjectQueue(QueueName.ROUND_END) private readonly roundEndQueue: Queue,
  ) {}

  async createRound(jobData: CreateOrEndRoundDto) {
    return await this.roundStartQueue.add(QueueName.ROUND_START, jobData);
  }

  @OnEvent(EventsEnum.ROUND_TO_CLOSED)
  async closeRound(jobData: { roundId: string; timeDelay: number }) {
    return await this.roundClosedQueue.add(QueueName.ROUND_CLOSED, jobData, {
      delay: jobData.timeDelay * 1000,
    });
  }

  async endRound(jobData: CreateOrEndRoundDto /*, timeDelay: number = 0*/) {
    return await this.roundEndQueue.add(
      QueueName.ROUND_END,
      jobData /*, { delay: timeDelay * 1000 }*/,
    );
  }
}
