import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateOperatorLimitsDto } from '../dtos/create-operator-limits.dto';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits.use-cases';
import { ApiResponse } from 'src/shared/dto/api-response.dto';
import { ApiResponseInterceptor } from 'src/shared/interceptors/api-response.interceptor';

@Controller('operator-limits')
@UseInterceptors(ApiResponseInterceptor)
export class OperatorLimitsController {
  constructor(
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
  ) {}

  @Post()
  async create(@Body() data: CreateOperatorLimitsDto) {
    const resp = await this.operatorLimitsUseCases.create(data);
    return new ApiResponse(201, resp, 'Operator Limits created');
  }

  @Get(':operatorId')
  async findById(@Param('operatorId') operatorId: string) {
    const resp = await this.operatorLimitsUseCases.findOneBy({
      operator: operatorId,
    });
    if (!resp) throw new NotFoundException();
    return new ApiResponse(200, resp, 'Operator Limits found');
  }
}
