import { Schema, model, Document } from 'mongoose';

interface Employee {
  Surname: string;
  FirstName: string;
  ManNo: string;
  NRC: string;
  Passport: string;
  EmailAddresses: string;
  PHONE: string;
  CAALicenceNo: string;
  LicenceExpiry: Date;
  CompanyStamp: string;
  picpath: string;
  designation: string;
}

export interface IEmployee extends Document, Employee {}

export const employeeListSchema = new Schema<Employee>({
  Surname: String,
  FirstName: String,
  ManNo: String,
  NRC: String,
  Passport: String,
  EmailAddresses: String,
  PHONE: String,
  CAALicenceNo: String,
  LicenceExpiry: Date,
  CompanyStamp: String,
  picpath: String,
  designation: String,
});
