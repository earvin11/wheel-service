import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { Jackpot, RoundEntity } from '../entities/round.entity';

export class Round implements RoundEntity {
  public result: number | null;
  public open?: boolean;
  public start_date: Date;
  public end_date?: Date;
  public jackpot_values?: Jackpot[];
  public gameUuid: string;
  public providerId: string;
  public identifierNumber: string;
  public uuid: string;

  constructor(data: RoundEntity) {
    this.end_date = data.end_date;
    this.gameUuid = data.gameUuid;
    this.identifierNumber = data.identifierNumber;
    this.jackpot_values = data.jackpot_values;
    this.open = true;
    this.providerId = data.providerId;
    this.result = null;
    this.start_date = data.start_date;
    this.uuid = generateUuid();
  }
}
