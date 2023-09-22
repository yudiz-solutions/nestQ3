// src/users/user.model.ts
import mongoose, { Document } from 'mongoose';
import { Role } from './role.enum';

export interface User {
  name: string;
  age: string;
  email: string;
  password: string;
  role:Role
  
}

export type UserDocument = User & Document;

const UserSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role:{type:String,enum:Role}
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export { UserSchema };
