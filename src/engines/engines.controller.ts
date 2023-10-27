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
import { EnginesService } from './engines.service';
import { IEngine } from './engines';

@Controller('engines')
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Post()
  async create(@Body() engine: IEngine) {
    const result = await this.enginesService.create(engine);
    if (result.success) {
      return result.createdEngine;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() engine: IEngine) {
    const result = await this.enginesService.update(id, engine);
    if (result.success) {
      return result.updatedEngine;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.enginesService.getById(id);
    if (result.success) {
      return result.engine;
    } else {
      throw new NotFoundException(result.error);
    }
  }

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
