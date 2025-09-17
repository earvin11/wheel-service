import {
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class LimitBet {
  @IsNumber()
  @IsPositive()
  min: number;
  @IsNumber()
  @IsPositive()
  max: number;
}

export class CreateOperatorLimitsDto {
  @IsString()
  currency: string;
  @IsString()
  operator: string;
  @IsString()
  short: string;
  @IsNumber()
  minBet: number;
  @IsNumber()
  maxBet: number;
  @IsNumber()
  maxBetPosition: number;
  @ValidateNested()
  pleno: LimitBet;
  @ValidateNested()
  semipleno: LimitBet;
  @ValidateNested()
  cuadro: LimitBet;
  @ValidateNested()
  calle: LimitBet;
  @ValidateNested()
  linea: LimitBet;
  @ValidateNested()
  columna: LimitBet;
  @ValidateNested()
  docena: LimitBet;
  @ValidateNested()
  cubre: LimitBet;
  @ValidateNested()
  chanceSimple: LimitBet;
  @ValidateNested()
  even_odd: LimitBet;
  @ValidateNested()
  color: LimitBet;
  @ValidateNested()
  specialCalle: LimitBet;
}
