import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUtilisation } from './utilisation';

@Injectable()
export class UtilisationService {
  constructor(
    @InjectModel('Utilisation')
    private readonly utilisationModel: Model<IUtilisation>,
  ) {}

  async create(
    utilisation: IUtilisation,
  ): Promise<{
    success: boolean;
    createdUtilisation?: IUtilisation;
    error?: string;
  }> {
    try {
      const createdUtilisation = await this.utilisationModel.create(
        utilisation,
      );
      if (!createdUtilisation) {
        throw new BadRequestException();
      }
      return { success: true, createdUtilisation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    utilisation: IUtilisation,
  ): Promise<{
    success: boolean;
    updatedUtilisation?: IUtilisation;
    error?: string;
  }> {
    try {
      const updatedUtilisation = await this.utilisationModel.findByIdAndUpdate(
        id,
        utilisation,
        { new: true },
      );
      if (!updatedUtilisation) {
        throw new NotFoundException('Utilisation not found');
      }
      return { success: true, updatedUtilisation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{ success: boolean; utilisation?: IUtilisation; error?: string }> {
    try {
      const utilisation = await this.utilisationModel.findById(id).exec();
      if (!utilisation) {
        throw new NotFoundException('Utilisation not found');
      }
      return { success: true, utilisation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    deletedUtilisation?: IUtilisation;
    error?: string;
  }> {
    try {
      const deletedUtilisation = await this.utilisationModel.findByIdAndRemove(
        id,
      );
      if (!deletedUtilisation) {
        throw new NotFoundException('Utilisation not found');
      }
      return { success: true, deletedUtilisation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
