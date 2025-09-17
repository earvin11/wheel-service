import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CreateBetsUseCase } from 'src/bets/application';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.BET)
export class CreateBetProcessor extends WorkerHost {
  constructor(private readonly createBetUseCases: CreateBetsUseCase) {
    super();
  }

  async process(job: any) {
    return await this.createBetUseCases.processBet(job.data);
  }
}
