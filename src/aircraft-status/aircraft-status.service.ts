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

  async create(aircraftStatus: IAircraftStatus): Promise<{
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

  async getById(id: string): Promise<{
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
  async getByAcreg(
    acReg: string,
    filter?: 'hours' | 'cycles',
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const aircraftStatus = await this.aircraftStatusModel
        .findOne({ acreg: acReg })
        .exec();

      if (!aircraftStatus) {
        throw new NotFoundException('Aircraft status not found');
      }

      // Validate and adjust the month values
      const validateMonthValues = (field: any): any => ({
        ...field,
        month: field?.month
          ? Math.max(1, Math.min(12, field.month))
          : undefined,
      });

      aircraftStatus.lifeTime = validateMonthValues(aircraftStatus.lifeTime);
      aircraftStatus.component = validateMonthValues(aircraftStatus.component);
      aircraftStatus.compliance = validateMonthValues(
        aircraftStatus.compliance,
      );
      aircraftStatus.installation = validateMonthValues(
        aircraftStatus.installation,
      );
      aircraftStatus.interval = validateMonthValues(aircraftStatus.interval);

      // Calculate the nextDue field based on the filter
      const getFieldSum = (field: any, prop: string): number =>
        field?.[prop] || 0;

      const nextDue =
        getFieldSum(aircraftStatus.installation, filter!!) +
        getFieldSum(aircraftStatus.interval, filter!!) -
        getFieldSum(aircraftStatus.component, filter!!) +
        getFieldSum(aircraftStatus.leniency, filter!!);

      // Add nextDue to the aircraftStatus object
      const aircraftStatusWithNextDue = {
        ...aircraftStatus.toObject(),
        nextDue,
      };

      return { success: true, data: aircraftStatusWithNextDue };
    } catch (error) {
      return {
        success: false,
        error: `Error fetching aircraft status: ${error.message}`,
      };
    }
  }
  async delete(id: string): Promise<{
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
