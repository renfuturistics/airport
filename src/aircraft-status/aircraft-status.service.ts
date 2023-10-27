import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAircraftStatus } from './aircraft-status';

@Injectable()
export class AircraftStatusService {
  constructor(
    @InjectModel('AircraftStatus')
    private readonly aircraftStatusModel: Model<IAircraftStatus>,
  ) {}

  async create(
    aircraftStatus: IAircraftStatus,
  ): Promise<{
    success: boolean;
    createdAircraftStatus?: IAircraftStatus;
    error?: string;
  }> {
    try {
      const createdAircraftStatus = await this.aircraftStatusModel.create(
        aircraftStatus,
      );
      if (!createdAircraftStatus) {
        throw new BadRequestException();
      }
      return { success: true, createdAircraftStatus };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    aircraftStatus: IAircraftStatus,
  ): Promise<{
    success: boolean;
    updatedAircraftStatus?: IAircraftStatus;
    error?: string;
  }> {
    try {
      const updatedAircraftStatus =
        await this.aircraftStatusModel.findByIdAndUpdate(id, aircraftStatus, {
          new: true,
        });
      if (!updatedAircraftStatus) {
        throw new NotFoundException('Aircraft Status not found');
      }
      return { success: true, updatedAircraftStatus };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{
    success: boolean;
    aircraftStatus?: IAircraftStatus;
    error?: string;
  }> {
    try {
      const aircraftStatus = await this.aircraftStatusModel.findById(id).exec();
      if (!aircraftStatus) {
        throw new NotFoundException('Aircraft Status not found');
      }
      return { success: true, aircraftStatus };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    deletedAircraftStatus?: IAircraftStatus;
    error?: string;
  }> {
    try {
      const deletedAircraftStatus =
        await this.aircraftStatusModel.findByIdAndRemove(id);
      if (!deletedAircraftStatus) {
        throw new NotFoundException('Aircraft Status not found');
      }
      return { success: true, deletedAircraftStatus };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
