import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { OperatorConfigUseCases } from 'src/operators/application/operator-config.use-cases';
import { CreateOperatorConfigDto } from '../dtos/create-operator-config.dto';
import { UpdateOperatorConfigDto } from '../dtos/update-operator-config.dto';
import { ApiResponseInterceptor } from 'src/shared/interceptors/api-response.interceptor';
import { ApiResponse } from 'src/shared/dto/api-response.dto';

@Controller('config')
@UseInterceptors(ApiResponseInterceptor)
export class OperatorConfigController {
  constructor(
    private readonly operatorConfigUseCases: OperatorConfigUseCases,
  ) {}

  @Post(':operatorId')
  @SwaggerApiResponse({
    status: 201,
    description: 'Config created',
  })
  async create(
    // @Headers('X-API-KEY') xApiKey: string
    @Param('operatorId') operatorId: string,
    @Body() createOperatorConfigDto: CreateOperatorConfigDto,
  ) {
    const data = await this.operatorConfigUseCases.create({
      ...createOperatorConfigDto,
      operator: operatorId.trim(),
    });
    return new ApiResponse(201, data, 'Config created');
  }

  @Get(':operatorId')
  @SwaggerApiResponse({
    status: 200,
    description: 'Config found',
  })
  async findByOperator(
    // @Headers('X-API-KEY') xApiKey: string,
    @Param('operatorId') operatorId: string,
  ) {
    const data = await this.operatorConfigUseCases.findByOperator(operatorId);
    if (!data) throw new NotFoundException('Config by operator not found');
    return new ApiResponse(200, data, 'Config found');
  }

  @Put(':operatorId')
  @SwaggerApiResponse({
    status: 200,
    description: 'Config updated',
  })
  async updateByOperator(
    // @Headers('X-API-KEY') xApiKey: string,
    @Param('operatorId') operatorId: string,
    @Body() updateOperatorConfigDto: UpdateOperatorConfigDto,
  ) {
    const data = await this.operatorConfigUseCases.updateByOperator(
      operatorId,
      updateOperatorConfigDto,
    );
    if (!data) throw new NotFoundException('Config by operator not found');
    return new ApiResponse(200, data, 'Config updated');
  }
}
