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
import { EngineControlService } from './engine-control.service';
import { IEngineControl } from './engine-control';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('engine-control')
export class EngineControlController {
  constructor(private readonly engineControlService: EngineControlService) {}

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() engineControl: IEngineControl) {
    const result = await this.engineControlService.create(engineControl);
    if (result.success) {
      return result.createdEngineControl;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() engineControl: IEngineControl) {
    const result = await this.engineControlService.update(id, engineControl);
    if (result.success) {
      return result.updatedEngineControl;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.engineControlService.getById(id);
    if (result.success) {
      return result.engineControl;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.engineControlService.delete(id);
    if (result.success) {
      return result.deletedEngineControl;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
