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
} from '@nestjs/common';
import { EngineControlService } from './engine-control.service';
import { IEngineControl } from './engine-control';

@Controller('engine-control')
export class EngineControlController {
  constructor(private readonly engineControlService: EngineControlService) {}

  @Post()
  async create(@Body() engineControl: IEngineControl) {
    const result = await this.engineControlService.create(engineControl);
    if (result.success) {
      return result.createdEngineControl;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() engineControl: IEngineControl) {
    const result = await this.engineControlService.update(id, engineControl);
    if (result.success) {
      return result.updatedEngineControl;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.engineControlService.getById(id);
    if (result.success) {
      return result.engineControl;
    } else {
      throw new NotFoundException(result.error);
    }
  }

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
