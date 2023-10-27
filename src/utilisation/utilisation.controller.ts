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
import { UtilisationService } from './utilisation.service';
import { IUtilisation } from './utilisation';

@Controller('utilisation')
export class UtilisationController {
  constructor(private readonly utilisationService: UtilisationService) {}

  @Post()
  async create(@Body() utilisation: IUtilisation) {
    const result = await this.utilisationService.create(utilisation);
    if (result.success) {
      return result.createdUtilisation;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() utilisation: IUtilisation) {
    const result = await this.utilisationService.update(id, utilisation);
    if (result.success) {
      return result.updatedUtilisation;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.utilisationService.getById(id);
    if (result.success) {
      return result.utilisation;
    } else {
      throw new NotFoundException(result.error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.utilisationService.delete(id);
    if (result.success) {
      return result.deletedUtilisation;
    } else {
      throw new NotFoundException(result.error);
    }
  }
}
