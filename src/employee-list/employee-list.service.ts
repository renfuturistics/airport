import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmployee } from './employee-list';
import { updateEmployeeDto } from './dto/updateEmployee.dto';

@Injectable()
export class EmployeeListService {
  constructor(
    @InjectModel('Employee') private readonly employee: Model<IEmployee>,
  ) {}

  async create(employeeData: IEmployee) {
    const { manNo, NRC, email, phoneNumber, CAALicenceNo } = employeeData;
    try {
      const findEmployee = await this.employee.find({
        $or: [{ manNo }, { NRC }, { email }, { phoneNumber }, { CAALicenceNo }],
      });
      if (findEmployee.length > 0)
        throw new BadRequestException(
          'Employee by email, ManNo, phone number,CAALicenceNo or NRC already exists',
        );
      const employee = await this.employee.create(employeeData);
      return { success: true, employee };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async findAll() {
    try {
      const employees = await this.employee.find().exec();
      if (!employees) throw new NotFoundException('No employees found');
      return { success: true, employees };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findOne(id: string) {
    try {
      const employee = await this.employee.findById(id).exec();
      if (!employee)
        throw new NotFoundException('no employee found by this id');
      return { success: true, employee };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id: string, employee: updateEmployeeDto) {
    try {
      const {
        designation,
        phoneNumber,
        email,
        CAALicenceNo,
        licenceExpiry,
        companyStamp,
        picpath,
      } = employee;
      const employees = await this.employee
        .findByIdAndUpdate(
          id,
          {
            designation,
            phoneNumber,
            email,
            CAALicenceNo,
            licenceExpiry,
            companyStamp,
            picpath,
          },
          { new: true },
        )
        .exec();
      if (!employees)
        throw new BadRequestException('Failed to update employee');
      return { success: true, employee: employees };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async remove(id: string) {
    try {
      const employee = await this.employee.findByIdAndRemove(id).exec();
      if (!employee)
        throw new BadRequestException('Failed to delete employee by this id');
      return { success: true, message: 'employee removed successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
