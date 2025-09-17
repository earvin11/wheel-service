import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateOperatorConfigDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  order: number;

  @ApiProperty()
  @IsArray()
  currencies: string[];

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  pleno?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  semipleno?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cuadro?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  calle?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  linea?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  columna?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  docena?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  color?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  evenOdd?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  chanceSimple?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cubre?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  specialCalle?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  layout?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  template?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  logo?: string;
}
