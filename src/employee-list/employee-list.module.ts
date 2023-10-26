import { Module } from '@nestjs/common';
import { EmployeeListController } from './employee-list.controller';
import { EmployeeListService } from './employee-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeListSchema } from './employee-list';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Employee', schema: employeeListSchema },
    ]),
  ],
  controllers: [EmployeeListController],
  providers: [EmployeeListService],
})
export class EmployeeListModule {}
