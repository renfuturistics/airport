import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AircraftStatusService } from './aircraft-status.service';
import { IAircraftStatus } from './aircraft-status';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('aircraft-status')
export class AircraftStatusController {
  constructor(private readonly aircraftStatusService: AircraftStatusService) {}

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() aircraftStatus: IAircraftStatus) {
    const result = await this.aircraftStatusService.create(aircraftStatus);
    if (result.success) {
      return result.createdAircraftStatus;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() aircraftStatus: IAircraftStatus,
  ) {
    const result = await this.aircraftStatusService.update(id, aircraftStatus);
    if (result.success) {
      return result.updatedAircraftStatus;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.aircraftStatusService.getById(id);
    if (result.success) {
      return result.aircraftStatus;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.aircraftStatusService.delete(id);
    if (result.success) {
      return result.deletedAircraftStatus;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
