import { Schema, model, Document } from 'mongoose';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  Password: string;
  user_type: string;
  designation: string;
}

export interface IUser extends Document, User {}

export const userSchema = new Schema<User>(
  {
    first_name: String,
    last_name: String,
    username: String,
    Password: String,
    user_type: String,
    designation: String,
  },
  { timestamps: true },
);
