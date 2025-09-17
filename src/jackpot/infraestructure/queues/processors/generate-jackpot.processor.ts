import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CreateJackpoUseCase } from 'src/jackpot/application/create-jackpot.use-case';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.CALCULATE_JACKPOT)
export class GenerateJackpotProcessor extends WorkerHost {
  constructor(private readonly createJackpotUseCase: CreateJackpoUseCase) {
    super();
  }

  async process(job: any) {
    return await this.createJackpotUseCase.run(job.data);
  }
}
