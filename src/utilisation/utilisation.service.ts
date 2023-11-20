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
    req: any,
  ): Promise<{
    success: boolean;
    createdUtilisation?: IUtilisation;
    error?: string;
  }> {
    try {
      const { _id } = req.user;
      const body = {
        ...utilisation,
        enteredBy: _id,
        lastEditedBy: _id,
      };
      const createdUtilisation = await this.utilisationModel.create(body);
      if (!createdUtilisation) {
        throw new BadRequestException();
      }
      return { success: true, createdUtilisation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateUtilisation(
    acReg: string,
    updateData: Partial<IUtilisation>,
    req: any,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Ensure acreg and enteredBy are not present in the updateData
      delete updateData.acreg;
      delete updateData.enteredBy;
      delete updateData.lastUpdatedDate;
      delete updateData.lastEditedBy;

      const { _id } = req.user;
      const update = {
        ...updateData,
        lastEditedBy: _id,
        lastUpdatedDate: Date.now(),
      };
      const updatedUtilisation = await this.utilisationModel
        .findOneAndUpdate({ acreg: acReg }, update, {
          new: true,
          runValidators: true,
        })
        .populate({
          path: 'enteredBy',
          select: 'name surname',
          model: 'User',
        })
        .populate({
          path: 'lastEditedBy',
          select: 'name surname',
          model: 'User',
        })
        .populate({
          path: 'captain',
          select: 'name surname',
          model: 'Employee',
        })
        .populate({
          path: 'firstOfficer',
          select: 'name surname',
          model: 'Employee',
        })
        .exec();

      if (!updatedUtilisation) {
        throw new NotFoundException('Utilisation not found');
      }

      return { success: true, data: updatedUtilisation };
    } catch (error) {
      return {
        success: false,
        error: `Error updating utilisation: ${error.message}`,
      };
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

  private calculateFlightTime(utilisation: IUtilisation): {
    hours: number;
    minutes: number;
  } {
    const departureTime = utilisation.departure.getTime();
    const arrivalTime = utilisation.arrival.getTime();
    const flightTimeInMilliseconds = arrivalTime - departureTime;

    // Calculate hours and remaining minutes
    const hours = Math.floor(flightTimeInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.round(
      (flightTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    return { hours, minutes };
  }

  private formatFlightTime(hours: number, minutes: number): string {
    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      formattedTime += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return formattedTime.trim();
  }

  async getByAcReg(
    acReg: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const utilisation = await this.utilisationModel
        .findOne({ acreg: acReg })
        .populate({
          path: 'enteredBy',
          select: 'name surname',
          model: 'User',
        })
        .populate({
          path: 'lastEditedBy',
          select: 'name surname',
          model: 'User',
        })
        .populate({
          path: 'captain',
          select: 'name surname',
          model: 'Employee',
        })
        .populate({
          path: 'firstOfficer',
          select: 'name surname',
          model: 'Employee',
        })
        .exec();

      if (!utilisation) {
        throw new NotFoundException('Utilisation not found');
      }

      // Calculate flight time
      const { hours, minutes } = this.calculateFlightTime(utilisation);

      // Format the flight time
      const formattedFlightTime = this.formatFlightTime(hours, minutes);

      // Add formattedFlightTime to the utilisation object
      const utilisationWithFlightTime = {
        ...utilisation.toObject(),
        formattedFlightTime,
        flightTimeInMinutes: hours * 60 + minutes, // Total flight time in minutes
        decimal: hours + minutes / 60, // Total flight time in hours (decimal)
      };

      return { success: true, data: utilisationWithFlightTime };
    } catch (error) {
      return {
        success: false,
        error: `Error fetching utilisation: ${error.message}`,
      };
    }
  }

  async delete(id: string): Promise<{
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
  async getFlightTime(acreg: string) {
    try {
      const utilisation = await this.utilisationModel.findOne({ acreg }).exec();

      if (!utilisation) {
        throw new Error('Utilisation not found');
      }

      const departureTime = utilisation.departure.getTime();
      const arrivalTime = utilisation.arrival.getTime();

      // Calculate the difference in milliseconds
      const flightTimeInMilliseconds = arrivalTime - departureTime;

      // Convert milliseconds to hours
      const flightTimeInHours = flightTimeInMilliseconds / (1000 * 60 * 60);

      return { success: true, flightTimeInHours };
    } catch (error) {
      return { success: false, message: error.message, code: error.statusCode };
    }
  }
}
