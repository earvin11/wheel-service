import { Module } from '@nestjs/common';
import { BetFavoriteController } from './controllers/bet-favorite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BetFavoriteModel,
  BetFavoriteSchema,
} from './models/bet-favorite.model';
import { BetFavoriteMongoRepository } from './repositories/bet-favorite.mongo-repository';
import { BetFavoriteUseCases } from '../application/bet-favorite.use-cases';
import { BetFavoriteRepository } from '../domain/bet-favorite.repository';

@Module({
  controllers: [BetFavoriteController],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      {
        name: BetFavoriteModel.name,
        schema: BetFavoriteSchema,
      },
    ]),
  ],
  providers: [
    BetFavoriteMongoRepository,
    BetFavoriteUseCases,
    {
      provide: BetFavoriteRepository,
      useExisting: BetFavoriteMongoRepository,
    },
  ],
})
export class BetFavoriteModule {}
