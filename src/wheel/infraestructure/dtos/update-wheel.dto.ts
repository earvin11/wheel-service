import { PartialType } from '@nestjs/mapped-types';
import { CreateWheelDto } from './create-wheel.dto';

export class UpdateRouletteDto extends PartialType(CreateWheelDto) {}
