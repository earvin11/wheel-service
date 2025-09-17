import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RouletteUseCases } from 'src/roulette/application/roulette.use-cases';
import { CreateRouletteDto } from '../dtos/create-roulette.dto';
import { ApiResponseInterceptor } from 'src/shared/interceptors/api-response.interceptor';
import { ApiResponse } from 'src/shared/dto/api-response.dto';
import { UpdateRouletteDto } from '../dtos/update-roulette.dto';

@Controller('roulettes')
@UseInterceptors(ApiResponseInterceptor)
export class RouletteController {
  constructor(private readonly rouletteUseCases: RouletteUseCases) {}

  @Post()
  async create(@Body() createRouletteDto: CreateRouletteDto) {
    const resp = await this.rouletteUseCases.create(createRouletteDto);
    return new ApiResponse(201, resp, 'Roulette created');
  }

  @Get()
  async findAll() {
    const resp = await this.rouletteUseCases.findAll();
    return new ApiResponse(200, resp, 'Roulette listed');
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    const resp = await this.rouletteUseCases.findByUuid(uuid);
    return new ApiResponse(200, resp, 'Roulette found');
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateRouletteDto: UpdateRouletteDto,
  ) {
    const resp = await this.rouletteUseCases.update(uuid, updateRouletteDto);
    return new ApiResponse(200, resp, 'Roulette update');
  }
}
