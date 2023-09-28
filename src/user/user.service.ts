// src/users/users.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    console.log('createdUser::', createdUser);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: UpdateUserDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    //  return result.ok === 1;
    return;
  }

  async register(userDto: CreateUserDto): Promise<UserDocument> {
    const { password } = userDto;
    userDto.password = await bcrypt.hash(password, 10);
    const user = new this.userModel(userDto);
    return user.save();
  }

  async login(userDto: CreateUserDto): Promise<object> {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new Error('User not found');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Password not match');
    }
    //return user;

    const jwt = await this.jwtService.signAsync({ email: user.email });
    return { jwt };
    // const payload = { email };
    // const token = this.jwtService.sign(payload);
    // return { token };
  }

  async profile(): Promise<object> {
    //return req.user;
    return { key: 'data come' };
  }
}
