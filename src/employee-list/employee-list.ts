import { Schema, model, Document } from 'mongoose';

interface Employee {
  surname: string;
  firstName: string;
  manNo: string;
  NRC: string;
  passport: string;
  email: string;
  phoneNumber: string;
  CAALicenceNo: string;
  licenceExpiry: Date;
  companyStamp: string;
  picpath: string;
  designation: string;
}

export interface IEmployee extends Document, Employee {}

export const employeeListSchema = new Schema<Employee>(
  {
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    manNo: { type: String, required: true, unique: true },
    NRC: { type: String, required: true, unique: true },
    passport: String,
    email: {
      required: [true, 'email is required'],
      type: String,
      unique: true,
      lowercase: true,
      min: 2,
      max: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          // Phone number validation regex (example: 123-456-7890)
          return /^\d{3}-\d{3}-\d{4}$/.test(value);
        },
        message:
          'Invalid phone number format. Please use the format 123-456-7890.',
      },
    },
    CAALicenceNo: { type: String, unique: true },
    licenceExpiry: Date,
    companyStamp: String,
    picpath: String,
    designation: String,
  },
  { timestamps: true },
);
