import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { EmployeeListService } from './employee-list.service';
import { updateEmployeeDto } from './dto/updateEmployee.dto';
import { IEmployee } from './employee-list';

@Controller('employee')
export class EmployeeListController {
  constructor(private readonly employeeService: EmployeeListService) {}

  @Get()
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeeService.findOne(id);
  }

  @Post()
  async create(@Body() employee: IEmployee) {
    return await this.employeeService.create(employee);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() employee: updateEmployeeDto) {
    return await this.employeeService.update(id, employee);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.employeeService.remove(id);
  }
}
