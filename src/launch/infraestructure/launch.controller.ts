import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { LaunchDto } from './dto/launch.dto';
import { LaunchUseCases } from '../application/launch.use-cases';
import { RoundUseCases } from 'src/rounds/application';
import { HotColdNumbersUseCase } from 'src/rounds/application/hot-cold-numbers.use-case';

@Controller('launch')
export class LaunchController {
  constructor(
    private readonly launchUseCases: LaunchUseCases,
    private readonly roundUseCases: RoundUseCases,
    private readonly hotColdNumbersUseCase: HotColdNumbersUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @SwaggerApiResponse({
    status: 200,
  })
  async launch(@Body() launchDto: LaunchDto) {
    const resp = await this.launchUseCases.run(launchDto);
    if (!resp.ok) throw new HttpException(resp.message, resp.status);
    return resp;
  }

  @Get('show-results')
  @HttpCode(200)
  @SwaggerApiResponse({
    status: 200,
  })
  @ApiQuery({ name: 'limitRounds', required: false })
  @ApiQuery({ name: 'limitResults', required: false })
  async showResults(
    @Query('limitRounds', new DefaultValuePipe(100), ParseIntPipe)
    limitRounds: number,
    @Query('limitResults', new DefaultValuePipe(40), ParseIntPipe)
    limitResults: number,
  ) {
    const [latestResults, /*numbersHotCold*/] = await Promise.all([
      this.roundUseCases.getLatestResults(limitResults),
      // this.hotColdNumbersUseCase.run(limitRounds),
    ]);

    // return { latestResults, numbersHotCold };
    return { latestResults };
  }
}
