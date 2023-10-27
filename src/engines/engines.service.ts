import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEngine } from './engines';

@Injectable()
export class EnginesService {
  constructor(
    @InjectModel('Engine')
    private readonly engineModel: Model<IEngine>,
  ) {}

  async create(
    engine: IEngine,
  ): Promise<{ success: boolean; createdEngine?: IEngine; error?: string }> {
    try {
      const createdEngine = await this.engineModel.create(engine);
      if (!createdEngine) {
        throw new BadRequestException();
      }
      return { success: true, createdEngine };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    engine: IEngine,
  ): Promise<{ success: boolean; updatedEngine?: IEngine; error?: string }> {
    try {
      const updatedEngine = await this.engineModel.findByIdAndUpdate(
        id,
        engine,
        { new: true },
      );
      if (!updatedEngine) {
        throw new NotFoundException('Engine not found');
      }
      return { success: true, updatedEngine };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{ success: boolean; engine?: IEngine; error?: string }> {
    try {
      const engine = await this.engineModel.findById(id).exec();
      if (!engine) {
        throw new NotFoundException('Engine not found');
      }
      return { success: true, engine };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{ success: boolean; deletedEngine?: IEngine; error?: string }> {
    try {
      const deletedEngine = await this.engineModel.findByIdAndRemove(id);
      if (!deletedEngine) {
        throw new NotFoundException('Engine not found');
      }
      return { success: true, deletedEngine };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
