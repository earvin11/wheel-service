import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { OperatorLimitsEntity } from '../entites/operator-limits.entity';

export class OperatorLimits implements OperatorLimitsEntity {
  public currency: string;
  public operator: string;
  public short: string;
  public minBet: number;
  public maxBet: number;
  public uuid: string;

  constructor(data: OperatorLimitsEntity) {
    this.currency = data.currency;
    this.operator = data.operator;
    this.short = data.short;
    this.maxBet = data.maxBet;
    this.minBet = data.minBet;
    this.uuid = generateUuid();
  }
}
