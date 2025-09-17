import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrEndRoundDto {
  @ApiProperty()
  @IsString()
  ID_Ruleta: string;

  @ApiProperty()
  @IsString()
  ID_Ronda: string;

  @ApiProperty()
  @IsString()
  Resultado: string;

  @ApiProperty()
  @IsString()
  Giro: string;

  @ApiProperty()
  @IsString()
  Rpm: string;

  @ApiProperty()
  @IsString()
  Error: string;

  @ApiProperty()
  @IsString()
  Fecha: string;
}
