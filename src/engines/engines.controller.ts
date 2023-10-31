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
import { EnginesService } from './engines.service';
import { IEngine } from './engines';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('engines')
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() engine: IEngine) {
    const result = await this.enginesService.create(engine);
    if (result.success) {
      return result.createdEngine;
    } else {
      throw new BadRequestException(result.error);
    }
  }
  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() engine: IEngine) {
    const result = await this.enginesService.update(id, engine);
    if (result.success) {
      return result.updatedEngine;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.enginesService.getById(id);
    if (result.success) {
      return result.engine;
    } else {
      throw new NotFoundException(result.error);
    }
  }
  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.enginesService.delete(id);
    if (result.success) {
      return result.deletedEngine;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
