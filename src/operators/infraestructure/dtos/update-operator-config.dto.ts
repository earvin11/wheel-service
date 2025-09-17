import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatorConfigDto } from './create-operator-config.dto';

export class UpdateOperatorConfigDto extends PartialType(
  CreateOperatorConfigDto,
) {}
