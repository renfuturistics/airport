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
import { EngineDetailService } from './engine-details.service';
import { IEngineDetail } from './engine-details';

@Controller('engine-detail')
export class EngineDetailController {
  constructor(private readonly engineDetailService: EngineDetailService) {}

  @Post()
  async create(@Body() engineDetail: IEngineDetail) {
    const result = await this.engineDetailService.create(engineDetail);
    if (result.success) {
      return result.createdEngineDetail;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() engineDetail: IEngineDetail) {
    const result = await this.engineDetailService.update(id, engineDetail);
    if (result.success) {
      return result.updatedEngineDetail;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.engineDetailService.getById(id);
    if (result.success) {
      return result.engineDetail;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.engineDetailService.delete(id);
    if (result.success) {
      return result.deletedEngineDetail;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
