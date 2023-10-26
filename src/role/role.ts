import { Document, Schema, model } from 'mongoose';

// Define the Role interface
export interface IRole {
  name: string;
  permissions: string[];
  createdAt: Date;
}

// Define the Role Schema
export const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    permissions: [
      {
        type: String,
        trim: true,
        // You can add additional validation for permission strings here
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);
