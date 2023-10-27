import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEngineDetail } from './engine-details';

@Injectable()
export class EngineDetailService {
  constructor(
    @InjectModel('EngineDetail')
    private readonly engineDetailModel: Model<IEngineDetail>,
  ) {}

  async create(
    engineDetail: IEngineDetail,
  ): Promise<{
    success: boolean;
    createdEngineDetail?: IEngineDetail;
    error?: string;
  }> {
    try {
      const createdEngineDetail = await this.engineDetailModel.create(
        engineDetail,
      );
      if (!createdEngineDetail) {
        throw new BadRequestException();
      }
      return { success: true, createdEngineDetail };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    engineDetail: IEngineDetail,
  ): Promise<{
    success: boolean;
    updatedEngineDetail?: IEngineDetail;
    error?: string;
  }> {
    try {
      const updatedEngineDetail =
        await this.engineDetailModel.findByIdAndUpdate(id, engineDetail, {
          new: true,
        });
      if (!updatedEngineDetail) {
        throw new NotFoundException('Engine Detail not found');
      }
      return { success: true, updatedEngineDetail };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{
    success: boolean;
    engineDetail?: IEngineDetail;
    error?: string;
  }> {
    try {
      const engineDetail = await this.engineDetailModel.findById(id).exec();
      if (!engineDetail) {
        throw new NotFoundException('Engine Detail not found');
      }
      return { success: true, engineDetail };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    deletedEngineDetail?: IEngineDetail;
    error?: string;
  }> {
    try {
      const deletedEngineDetail =
        await this.engineDetailModel.findByIdAndRemove(id);
      if (!deletedEngineDetail) {
        throw new NotFoundException('Engine Detail not found');
      }
      return { success: true, deletedEngineDetail };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
