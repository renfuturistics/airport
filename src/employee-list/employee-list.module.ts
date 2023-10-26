import { Module } from '@nestjs/common';
import { EmployeeListController } from './employee-list.controller';
import { EmployeeListService } from './employee-list.service';

@Module({
  controllers: [EmployeeListController],
  providers: [EmployeeListService]
})
export class EmployeeListModule {}
