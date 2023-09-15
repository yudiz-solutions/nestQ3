import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User, UserSchema } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  // constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<typeof UserSchema>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
