import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ClosedRoundUseCase } from 'src/rounds/application/closed-round.use-case';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.ROUND_CLOSED)
export class RoundClosedProcessor extends WorkerHost {
  constructor(private readonly closedRoundUseCase: ClosedRoundUseCase) {
    super();
  }

  async process(job: any) {
    const { data } = job;
    return await this.closedRoundUseCase.run(data.roundUuid);
  }
}
