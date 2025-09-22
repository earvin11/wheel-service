import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { BetEntity } from '../entities/bet.entity';

export class Bet implements BetEntity {
  public roundUuid: string;
  public playerUuid: string;
  public gameUuid: string;
  public operatorUuid: string;
  public amount: number;
  public value: number;
  public betReference: string;
  public isWinner: boolean;
  public amountPayout: number;
  public uuid: string;
  public playerWalletId: string;
  public currency: string;

  constructor(data: BetEntity) {
    this.roundUuid = data.roundUuid;
    this.playerUuid = data.playerUuid;
    this.gameUuid = data.gameUuid;
    this.operatorUuid = data.operatorUuid;
    this.amount = data.amount;
    this.value = data.value;
    this.isWinner = false;
    this.amountPayout = 0;
    this.betReference = data.betReference;
    this.playerWalletId = data.playerWalletId;
    this.currency = data.currency;
    this.uuid = generateUuid();
  }
}
