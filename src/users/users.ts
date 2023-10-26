import { Schema, model, Document } from 'mongoose';

interface User {
  userid: string;
  Title: string;
  Compliance_Asset_Id: string;
  first_name: string;
  last_name: string;
  username: string;
  Password: string;
  user_type: string;
  designation: string;

  Workflow_Instance_ID: string;
}

export interface IUser extends Document, User {}

export const userSchema = new Schema<User>({
  userid: String,
  Title: String,
  Compliance_Asset_Id: String,
  first_name: String,
  last_name: String,
  username: String,
  Password: String,
  user_type: String,
  designation: String,

  Workflow_Instance_ID: String,
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
