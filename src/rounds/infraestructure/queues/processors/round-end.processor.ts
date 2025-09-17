import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EndRoundUseCase } from 'src/rounds/application/end-round.use-case';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Processor(QueueName.ROUND_END)
export class RoundEndProcessor extends WorkerHost {
  constructor(private readonly endRoundUseCase: EndRoundUseCase) {
    super();
  }

  async process(job: any) {
    const { data } = job;
    return await this.endRoundUseCase.run(data);
  }
}
