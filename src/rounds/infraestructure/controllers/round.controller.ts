import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { RoundQueueService } from '../queues/round-queue.service';
import { RoundUseCases } from 'src/rounds/application';
import { LoggerPort } from 'src/logging/domain/logger.port';
import * as rawbody from 'raw-body';

@Controller('round')
export class RoundController {
  constructor(
    private readonly roundQueueService: RoundQueueService,
    private readonly roundUseCases: RoundUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  @Get()
  async findAll() {
    return await this.roundUseCases.findAll();
  }

  //     @Put('start')
  //     async start(@Body() data: any, @Req() req: any) {
  //     // let data: any;

  //     // try {
  //     //   data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  //     // } catch {
  //     //   throw new BadRequestException('Body inválido: no es JSON');
  //     // }

  //     // console.log({ data })
  //     // // Ya tienes el payload
  //     // const { ID_Ronda, ID_Ruleta, Fecha, Giro, Rpm, Error, Resultado } = data;
  //     // // ... tu lógica
  //     // return { ID_Ronda, ID_Ruleta, Fecha, Giro, Rpm, Error, Resultado };

  //      if (req.readable) {
  //       // body is ignored by NestJS -> get raw body from request
  //       const raw = await rawbody(req);
  //       const text = raw.toString().trim();
  //       console.log('body:', text);

  //     } else {
  //       // body is parsed by NestJS
  //       console.log('data:', data);
  //     }

  //   }

  @Put('start')
  async start(@Req() req: RawBodyRequest<Request>) {
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();

      const createRoundDto = text;

      await this.roundQueueService.createRound(JSON.parse(createRoundDto));
      return { message: 'Round processing' };
    } else {
      this.loggerPort.error('Error Round Start', 'Error creando ronda');
      throw new BadRequestException();
    }
  }

  @Put('end')
  async end(@Req() req: Request) {
    // const endRoundDto = req.body;
    // this.loggerPort.log('Round end', endRoundDto);
    // await this.roundQueueService.endRound(JSON.parse(endRoundDto));
    // return res.json({ message: 'End round' });

    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();

      const endRoundDto = text;

      await this.roundQueueService.endRound(JSON.parse(endRoundDto));
      return { message: 'Round end processing' };
    } else {
      this.loggerPort.error('Error Round End', 'Error cerrando ronda');
      throw new BadRequestException();
    }
  }
}
