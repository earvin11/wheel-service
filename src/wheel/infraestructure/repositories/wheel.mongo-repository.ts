import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wheel } from '../models/wheel.model';
import { WheelEntity } from 'src/wheel/domain/entites/wheel.entity';
import { WheelRepository } from 'src/wheel/domain/repositories/wheel.repository';

export class WheelMongoRepository implements WheelRepository {
  constructor(
    @InjectModel(Wheel.name)
    private readonly wheel: Model<Wheel>,
  ) {}

  public create = async (data: WheelEntity): Promise<WheelEntity> => {
    const newData = await this.wheel.create(data);
    return await newData.save();
  };
  public findAll = async (
    page: number,
    limit: number,
    populateFields?: string | string[],
  ): Promise<WheelEntity[] | []> => {
    // let query = this.wheel.find().skip(page).limit(limit);
    // console.log({ query })

    // if (populateFields) {
    //     query = query.populate(populateFields);
    // }

    // const data = await query.exec();
    // return data;
    return await this.wheel.find();
  };
  public findById = async (
    id: string,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null> => {
    let query = this.wheel.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findByUuid = async (
    uuid: string,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null> => {
    let query = this.wheel.findOne({ uuid });
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public findOneBy = async (
    filter: Record<string, any>,
    populateFields?: string | string[],
  ): Promise<WheelEntity | null> => {
    let query = this.wheel.findOne(filter);

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
  ): Promise<WheelEntity[] | []> => {
    let query = this.wheel.find(filter);
    if (populateFields) {
      query = query.populate(populateFields);
    }

    const data = await query.exec();
    return data;
  };
  public update = async (
    id: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null> => {
    const resp = await this.wheel.findByIdAndUpdate(id, data);
    return resp;
  };
  public updateByUuid = async (
    uuid: string,
    data: Partial<WheelEntity>,
  ): Promise<WheelEntity | null> => {
    const resp = await this.wheel.findOneAndUpdate({ uuid }, data);
    return resp;
  };
  public remove = async (id: string): Promise<WheelEntity | null> => {
    const resp = await this.wheel.findByIdAndDelete(id);
    return resp;
  };
}
