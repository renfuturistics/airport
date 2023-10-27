import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdsSbs } from './ads_sbs';

@Injectable()
export class AdsSbsService {
  constructor(
    @InjectModel('AdsSbs')
    private readonly adsSbsModel: Model<IAdsSbs>,
  ) {}

  async create(
    adsSbs: IAdsSbs,
  ): Promise<{ success: boolean; createdAdsSbs?: IAdsSbs; error?: string }> {
    try {
      const createdAdsSbs = await this.adsSbsModel.create(adsSbs);
      if (!createdAdsSbs) {
        throw new BadRequestException();
      }
      return { success: true, createdAdsSbs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    adsSbs: IAdsSbs,
  ): Promise<{ success: boolean; updatedAdsSbs?: IAdsSbs; error?: string }> {
    try {
      const updatedAdsSbs = await this.adsSbsModel.findByIdAndUpdate(
        id,
        adsSbs,
        { new: true },
      );
      if (!updatedAdsSbs) {
        throw new NotFoundException('AdsSbs not found');
      }
      return { success: true, updatedAdsSbs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{ success: boolean; adsSbs?: IAdsSbs; error?: string }> {
    try {
      const adsSbs = await this.adsSbsModel.findById(id).exec();
      if (!adsSbs) {
        throw new NotFoundException('AdsSbs not found');
      }
      return { success: true, adsSbs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{ success: boolean; deletedAdsSbs?: IAdsSbs; error?: string }> {
    try {
      const deletedAdsSbs = await this.adsSbsModel.findByIdAndRemove(id);
      if (!deletedAdsSbs) {
        throw new NotFoundException('AdsSbs not found');
      }
      return { success: true, deletedAdsSbs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
