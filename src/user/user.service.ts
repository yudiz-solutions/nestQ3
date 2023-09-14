import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserSchema } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(Task.name) private userModel: Model<UserSchema>) {}

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(createUserDto: CreateUserDto) {
    // const newUser = {
    //   id: (this.users.length + 1).toString(),
    //   ...createUserDto,
    // };
    // this.users.push(newUser);
    // return newUser;
    await UserSchema.create(createUserDto);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
}
