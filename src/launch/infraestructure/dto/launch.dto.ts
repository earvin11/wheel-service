import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LaunchDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  casinoId: string;

  @ApiProperty()
  @IsString()
  casinoToken: string;

  @ApiProperty()
  @IsString()
  operatorId: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  language: string;
}
