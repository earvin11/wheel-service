import { Processor, WorkerHost } from '@nestjs/bullmq';
import { PayBetsUseCase } from 'src/bets/application/pay-bets.use-case';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.PAY_BETS)
export class PayBetsProcessor extends WorkerHost {
  constructor(private readonly payBetsUseCase: PayBetsUseCase) {
    super();
  }

  async process(job: any) {
    const { round } = job.data;
    return await this.payBetsUseCase.run(round);
  }
}
