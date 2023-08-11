import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  private users = [
    { id: '1', name: 'parita', age: 22, email: 'parita.ganatra@yudiz.com' },
    { id: '2', name: 'disha', age: 21, email: 'disha@gmail.com' },
  ];

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.users.find((user) => user.id === id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = {
      id: (this.users.length + 1).toString(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
}
