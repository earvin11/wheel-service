import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CreateRoundUseCase } from 'src/rounds/application/create-round.use-case';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.ROUND_START)
export class RoundStartProcessor extends WorkerHost {
  constructor(private readonly createRoundUseCase: CreateRoundUseCase) {
    super();
  }

  async process(job: any) {
    const { data } = job; // data es de tipo CreateRoundJob
    return await this.createRoundUseCase.run(data);
  }
}
