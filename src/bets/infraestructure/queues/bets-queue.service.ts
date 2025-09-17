import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bullmq';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Injectable()
export class BetQueueService {
  constructor(
    @InjectQueue(QueueName.BET) private readonly createBetQueue: Queue,
    @InjectQueue(QueueName.PAY_BETS) private readonly payBetsQueue: Queue,
  ) {}

  @OnEvent(EventsEnum.ROUND_END)
  async payBets(jobData: { round: string; result: number }) {
    return await this.payBetsQueue.add(QueueName.PAY_BETS, jobData);
  }

  async createBet(jobData: any) {
    return await this.createBetQueue.add(QueueName.BET, jobData);
  }
}
