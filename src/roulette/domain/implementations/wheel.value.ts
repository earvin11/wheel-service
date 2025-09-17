import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { WheelEntity } from '../entites/wheel.entity';

export class Wheel implements WheelEntity {
  public name: string;
  public providerId: string;
  public roundDuration: number;
  public timeToReleaseJack: number;
  public maxPlenosBet: number;
  public jackpot?: boolean;
  public doubleZero?: boolean;
  public uuid: string;
  public isManualRoulette?: boolean;
  public active?: boolean;
  public urlTransmision: string;
  public openingTime: string;
  public closingTime: string;
  public imgBackground: string;
  public manualDisable?: boolean;

  constructor(data: WheelEntity) {
    this.name = data.name;
    this.providerId = data.providerId;
    this.doubleZero = data.doubleZero;
    this.jackpot = data.jackpot;
    this.maxPlenosBet = data.maxPlenosBet;
    this.uuid = generateUuid();
    this.timeToReleaseJack = data.timeToReleaseJack;
    this.roundDuration = data.roundDuration;
    this.isManualRoulette = data.isManualRoulette;
    this.active = true;
    this.urlTransmision = data.urlTransmision;
    this.openingTime = data.openingTime;
    this.closingTime = data.closingTime;
    this.imgBackground = data.imgBackground;
    this.manualDisable = false;
  }
}
