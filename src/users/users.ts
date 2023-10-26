import { Schema, model, Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
interface User {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  roles: Types.ObjectId[];
  designation: string;
}

export interface IUser extends Document, User {}

export const userSchema = new Schema<User>(
  {
    first_name: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z]{2,50}$/.test(value);
        },
        message: 'Invalid name format. Please use letters only.',
      },
    },
    last_name: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z]{2,50}$/.test(value);
        },
        message: 'Invalid surname format. Please use letters only.',
      },
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 20 },
    roles: [
      {
        type: Types.ObjectId,
        ref: 'Role', // Reference to the Role model
      },
    ],
    designation: { type: String, required: true },
  },
  { timestamps: true },
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt();
  // never remove await
  const passwordHash = await bcrypt.hash(this.password, salt);
  this.password = passwordHash;
});
