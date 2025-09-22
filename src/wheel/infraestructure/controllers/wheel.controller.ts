import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WheelUseCases } from 'src/wheel/application/wheel.use-cases';
import { CreateWheelDto } from '../dtos/create-wheel.dto';
import { ApiResponseInterceptor } from 'src/shared/interceptors/api-response.interceptor';
import { ApiResponse } from 'src/shared/dto/api-response.dto';
import { UpdateRouletteDto } from '../dtos/update-wheel.dto';

@Controller('roulettes')
@UseInterceptors(ApiResponseInterceptor)
export class RouletteController {
  constructor(private readonly wheelUseCases: WheelUseCases) {}

  @Post()
  async create(@Body() createRouletteDto: CreateWheelDto) {
    const resp = await this.wheelUseCases.create(createRouletteDto);
    return new ApiResponse(201, resp, 'Wheel created');
  }

  @Get()
  async findAll() {
    const resp = await this.wheelUseCases.findAll();
    return new ApiResponse(200, resp, 'Wheel listed');
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const resp = await this.wheelUseCases.findByUuid(uuid);
    return new ApiResponse(200, resp, 'Wheel found');
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateRouletteDto: UpdateRouletteDto,
  ) {
    const resp = await this.wheelUseCases.update(uuid, updateRouletteDto);
    return new ApiResponse(200, resp, 'Wheel update');
  }
}
