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
import { AdsSbsService } from './ads_sbs.service';
import { IAdsSbs } from './ads_sbs';

@Controller('ads-sbs')
export class AdsSbsController {
  constructor(private readonly adsSbsService: AdsSbsService) {}

  @Post()
  async create(@Body() adsSbs: IAdsSbs) {
    const result = await this.adsSbsService.create(adsSbs);
    if (result.success) {
      return result.createdAdsSbs;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() adsSbs: IAdsSbs) {
    const result = await this.adsSbsService.update(id, adsSbs);
    if (result.success) {
      return result.updatedAdsSbs;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.adsSbsService.getById(id);
    if (result.success) {
      return result.adsSbs;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.adsSbsService.delete(id);
    if (result.success) {
      return result.deletedAdsSbs;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
