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
  Request,
} from '@nestjs/common';
import { UtilisationService } from './utilisation.service';
import { IUtilisation } from './utilisation';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('utilisation')
export class UtilisationController {
  constructor(private readonly utilisationService: UtilisationService) {}

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() utilisation: IUtilisation, @Request() req: any) {
    const result = await this.utilisationService.create(utilisation, req);
    if (result.success) {
      return result.createdUtilisation;
    } else {
      throw new BadRequestException(result.error);
    }
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':acreg')
  async update(
    @Param('acreg') acreg: string,
    @Body() utilisation: IUtilisation,
    @Request() req: any,
  ) {
    const result = await this.utilisationService.updateUtilisation(
      acreg,
      utilisation,
      req,
    );
    return result;
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
  @Get('get-by-acreg/:acreg')
  async getByAcreg(@Param('acreg') acreg: string) {
    const result = await this.utilisationService.getByAcReg(acreg);
    return result;
  }
  @Get('flight-time/:acreg')
  async getFlightTime(@Param('acreg') acreg: string) {
    const result = await this.utilisationService.getFlightTime(acreg);
    return result;
  }

  @Roles('Admin', 'Superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
