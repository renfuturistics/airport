import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAircraftSpecifications } from './aircraft-specifications';

@Injectable()
export class AircraftSpecificationsService {
  constructor(
    @InjectModel('AircraftSpecification')
    private readonly aircraftSpecificationModel: Model<IAircraftSpecifications>,
  ) {}

  async create(
    aircraftSpecification: IAircraftSpecifications,
  ): Promise<{
    success: boolean;
    createdAircraftSpecification?: IAircraftSpecifications;
    error?: string;
  }> {
    try {
      const createdAircraftSpecification =
        await this.aircraftSpecificationModel.create(aircraftSpecification);
      if (!createdAircraftSpecification) {
        throw new BadRequestException();
      }
      return { success: true, createdAircraftSpecification };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: string,
    aircraftSpecification: IAircraftSpecifications,
  ): Promise<{
    success: boolean;
    updatedAircraftSpecification?: IAircraftSpecifications;
    error?: string;
  }> {
    try {
      const updatedAircraftSpecification =
        await this.aircraftSpecificationModel.findByIdAndUpdate(
          id,
          aircraftSpecification,
          { new: true },
        );
      if (!updatedAircraftSpecification) {
        throw new NotFoundException('Aircraft Specification not found');
      }
      return { success: true, updatedAircraftSpecification };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(
    id: string,
  ): Promise<{
    success: boolean;
    aircraftSpecification?: IAircraftSpecifications;
    error?: string;
  }> {
    try {
      const aircraftSpecification = await this.aircraftSpecificationModel
        .findById(id)
        .exec();
      if (!aircraftSpecification) {
        throw new NotFoundException('Aircraft Specification not found');
      }
      return { success: true, aircraftSpecification };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    deletedAircraftSpecification?: IAircraftSpecifications;
    error?: string;
  }> {
    try {
      const deletedAircraftSpecification =
        await this.aircraftSpecificationModel.findByIdAndRemove(id);
      if (!deletedAircraftSpecification) {
        throw new NotFoundException('Aircraft Specification not found');
      }
      return { success: true, deletedAircraftSpecification };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
