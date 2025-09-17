import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { CreateBetFavoriteDto } from '../dtos/create-bet-favorite.dto';
import { BetFavoriteUseCases } from 'src/bets-favorites/application/bet-favorite.use-cases';
import { ApiResponseInterceptor } from 'src/shared/interceptors/api-response.interceptor';
import { ApiResponse } from 'src/shared/dto/api-response.dto';

@Controller('bet-favorites')
@UseInterceptors(ApiResponseInterceptor)
export class BetFavoriteController {
  constructor(private readonly betFavoriteUseCases: BetFavoriteUseCases) {}

  @Post()
  @SwaggerApiResponse({
    status: 201,
    description: 'Created',
  })
  async create(@Body() createBetFavoriteDto: CreateBetFavoriteDto) {
    const data = await this.betFavoriteUseCases.create(createBetFavoriteDto);
    return new ApiResponse(201, data, 'Created');
  }

  // @Patch(':id')
  // async update(
  //     @Param('id') id: string,
  //     @Body() updateBetFavoriteDto:
  // ) {}

  @Get(':player')
  @SwaggerApiResponse({
    status: 200,
    description: 'Listed',
  })
  async findBetsByPlayer(@Param('player') player: string) {
    const data = await this.betFavoriteUseCases.findBetsByPlayer(player);
    if (!data.length)
      throw new NotFoundException('Player do not have favorites bet');
    return new ApiResponse(200, data, 'Listed');
  }
}
