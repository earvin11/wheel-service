import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roulette } from '../models/roulette.model';
import { RouletteRepository } from 'src/roulette/domain/repositories/roulette.repository';
import { RouletteEntity } from 'src/roulette/domain/entites/roulette.entity';

export class RouletteMongoRepository implements RouletteRepository {
  constructor(
    @InjectModel(Roulette.name)
    private readonly roulette: Model<Roulette>,
  ) {}

  public create = async (data: RouletteEntity): Promise<RouletteEntity> => {
    const newData = await this.roulette.create(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<RouletteEntity[] | []> => {
    // let query = this.roulette.find().skip(page).limit(limit);
    // console.log({ query })

    // if (populateFields) {
    //     query = query.populate(populateFields);
    // }

    // const data = await query.exec();
    // return data;
    return await this.roulette.find();
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null> => {
    let query = this.roulette.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findByUuid = async (
    uuid: string,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null> => {
    let query = this.roulette.findOne({ uuid });
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<RouletteEntity | null> => {
    let query = this.roulette.findOne(filter);

    // Si hay campos para popular
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findManyBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<RouletteEntity[] | []> => {
    let query = this.roulette.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<RouletteEntity>,
  ): Promise<RouletteEntity | null> => {
    const resp = await this.roulette.findByIdAndUpdate(id, data);
    return resp;
  };
  public updateByUuid = async (
    uuid: string,
    data: Partial<RouletteEntity>,
  ): Promise<RouletteEntity | null> => {
    const resp = await this.roulette.findOneAndUpdate({ uuid }, data);
    return resp;
  };
  public remove = async (id: string): Promise<RouletteEntity | null> => {
    const resp = await this.roulette.findByIdAndDelete(id);
    return resp;
  };
}
