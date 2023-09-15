import mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: String, required: true },
//   email: { type: String, required: true },
// });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
});

// Create and export the User model based on the schema
export const User = mongoose.model('User', UserSchema);
export { UserSchema };
