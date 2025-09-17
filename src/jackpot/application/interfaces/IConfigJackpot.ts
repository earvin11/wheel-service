import { IBetsPrizeMoney } from './IBets';

export interface IConfigJackpot {
  betPrizeMoney: IBetsPrizeMoney;
  virtualBank_min: number;
  virtualBank_max: number;
  virtualBank_part: number; //x=18 const (n - 1) / n == (x-1)/x === n = n-(17/18) === 1-(17/18) ~= 0.055...
  collectionOfMultipliers: number[];
  sizeJackpots: number;
}
