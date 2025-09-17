import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateRouletteDto {
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
  @IsBoolean()
  @IsOptional()
  jackpot?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  doubleZero?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isManualRoulette?: boolean;
}
