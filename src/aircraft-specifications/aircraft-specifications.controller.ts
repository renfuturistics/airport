import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AircraftSpecificationsService } from './aircraft-specifications.service';
import { IAircraftSpecifications } from './aircraft-specifications';
import { JwtAuthGuard } from 'src/auth//jwt-auth.guard';
import { Roles } from 'src/auth//roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('aircraft-specifications')
export class AircraftSpecificationsController {
  constructor(
    private readonly aircraftSpecificationsService: AircraftSpecificationsService,
  ) {}

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() aircraftSpecification: IAircraftSpecifications) {
    const result = await this.aircraftSpecificationsService.create(
      aircraftSpecification,
    );
    if (result.success) {
      return result.createdAircraftSpecification;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() aircraftSpecification: IAircraftSpecifications,
  ) {
    const result = await this.aircraftSpecificationsService.update(
      id,
      aircraftSpecification,
    );
    if (result.success) {
      return result.updatedAircraftSpecification;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.aircraftSpecificationsService.getById(id);
    if (result.success) {
      return result.aircraftSpecification;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.aircraftSpecificationsService.delete(id);
    if (result.success) {
      return result.deletedAircraftSpecification;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
