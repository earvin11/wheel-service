import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { BetPay } from 'src/wheel/domain/entites/wheel.entity';

export class CreateWheelDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  roundDuration: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  timeToReleaseJack: number;

  @ApiProperty()
  @IsString()
  urlTransmision: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  maxPlenosBet: number;

  @ApiProperty()
  @IsString()
  openingTime: string;

  @ApiProperty()
  @IsString()
  closingTime: string;

  @ApiProperty()
  @IsString()
  imgBackground: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  percentReturnToPlayer: number;

  @ApiProperty()
  @IsNumber()
  bank: number;

  @ApiProperty()
  @IsNumber()
  startRoundTime: number;

  @ApiProperty()
  @IsObject()
  betPays: BetPay[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  alwaysOpen?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  maxBetFigures: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  betTime: number;

  @ApiProperty()
  @IsBoolean()
  jackpot: boolean;
}
