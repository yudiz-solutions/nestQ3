import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
});
