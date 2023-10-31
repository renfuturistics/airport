import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './users';
import { updateUserDto } from './dto/updateUser.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { RolesGuard } from 'src/auth/roles.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: IUser) {
    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: updateUserDto) {
    return await this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
