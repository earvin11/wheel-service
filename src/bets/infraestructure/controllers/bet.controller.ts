import { Body, Controller, Get, Post } from '@nestjs/common';
import { BetUseCases } from 'src/bets/application/bet.use-cases';
import { CreateBetsUseCase } from 'src/bets/application/create-bets.use-case';
import { BetInputInterface } from 'src/shared/interfaces/bet-input.interface';

@Controller('bets')
export class BetController {
  constructor(
    private readonly betUseCases: BetUseCases,
    private readonly createBetsUseCase: CreateBetsUseCase,
  ) {}

  @Post()
  async create(@Body() data: BetInputInterface) {
    return await this.createBetsUseCase.processBet(data);
  }

  @Get()
  async findAll() {
    return await this.betUseCases.findAll();
  }
}
