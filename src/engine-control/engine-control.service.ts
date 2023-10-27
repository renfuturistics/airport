import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEngineControl } from './engine-control';

@Injectable()
export class EngineControlService {
  constructor(
    @InjectModel('EngineControl')
    private readonly engineControlModel: Model<IEngineControl>,
  ) {}

  async create(
    engineControl: IEngineControl,
  ): Promise<{
    success: boolean;
    createdEngineControl?: IEngineControl;
    error?: string;
  }> {
    try {
      const createdEngineControl = await this.engineControlModel.create(
        engineControl,
      );
      if (!createdEngineControl) {
        throw new BadRequestException();
      }
      return { success: true, createdEngineControl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    engineControl: IEngineControl,
  ): Promise<{
    success: boolean;
    updatedEngineControl?: IEngineControl;
    error?: string;
  }> {
    try {
      const updatedEngineControl =
        await this.engineControlModel.findByIdAndUpdate(id, engineControl, {
          new: true,
        });
      if (!updatedEngineControl) {
        throw new NotFoundException('Engine Control not found');
      }
      return { success: true, updatedEngineControl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{
    success: boolean;
    engineControl?: IEngineControl;
    error?: string;
  }> {
    try {
      const engineControl = await this.engineControlModel.findById(id).exec();
      if (!engineControl) {
        throw new NotFoundException('Engine Control not found');
      }
      return { success: true, engineControl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    deletedEngineControl?: IEngineControl;
    error?: string;
  }> {
    try {
      const deletedEngineControl =
        await this.engineControlModel.findByIdAndRemove(id);
      if (!deletedEngineControl) {
        throw new NotFoundException('Engine Control not found');
      }
      return { success: true, deletedEngineControl };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
