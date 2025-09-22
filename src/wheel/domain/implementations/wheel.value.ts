import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { BetPay, WheelEntity } from '../entites/wheel.entity';

export class Wheel implements WheelEntity {
  public name: string;
  public providerId: string;
  public roundDuration: number;
  public urlTransmision: string;
  public openingTime: string;
  public closingTime: string;
  public imgBackground: string;
  public active: boolean;
  public manualDisable: boolean;
  public uuid: string;
  public percentReturnToPlayer: number;
  public bank: number;
  public startRoundTime: number;
  public betPays: BetPay[];
  public alwaysOpen: boolean;
  public maxBetFigures: number;
  public betTime: number;
  public jackpot: boolean;
  public type: string;

  constructor(data: WheelEntity) {
    this.active = true;
    this.alwaysOpen = false;
    this.bank = 0;
    this.betPays = data.betPays;
    this.betTime = data.betTime;
    this.closingTime = data.closingTime;
    this.imgBackground = data.imgBackground;
    this.jackpot = data.jackpot;
    this.manualDisable = false;
    this.maxBetFigures = data.maxBetFigures;
    this.name = data.name;
    this.openingTime = data.openingTime;
    this.percentReturnToPlayer = data.percentReturnToPlayer;
    this.providerId = data.providerId;
    this.roundDuration = data.roundDuration;
    this.startRoundTime = data.startRoundTime;
    (this.type = 'WHEEL'), (this.urlTransmision = this.urlTransmision);
    this.uuid = generateUuid();
  }
}
