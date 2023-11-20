import { Schema, model, Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
interface User {
  name: string;
  surname: string;
  username: string;
  password: string;
  roles: Types.ObjectId[];
  email: string;
  designation: string;
  passwordChangedAt: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  refreshToken: string | undefined | null;
  createPasswordResetToken: () => any;
}

export interface IUser extends Document, User {}

export const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z]{2,50}$/.test(value);
        },
        message: 'Invalid name format. Please use letters only.',
      },
    },
    surname: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z]{2,50}$/.test(value);
        },
        message: 'Invalid surname format. Please use letters only.',
      },
    },
    email: {
      required: [true, 'email is required'],
      type: String,
      unique: true,
      lowercase: true,
      min: 2,
      max: 100,
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
    refreshToken: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
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
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};
