// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  //Request,
  UseGuards,
  Req,
  Session,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDocument } from './user.model';
import { UserGuard } from './user.guard';
import { RoleGuard } from './role.guard';
import { Role } from './role.enum';
import { UserEntity } from './serialization/user.entity';
import { Request } from 'express';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
//use guard at controller level
//@UseGuards(new UserGuard())
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  //@UseGuards(UserGuard)

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.UsersService.findAll();
  }

  @Get('findById/:id')
  async findOne(@Param('id') id: string): Promise<UserDocument | null> {
    return this.UsersService.findOne(id);
  }

  @Get('/Serialization')
  findUsingSerialization(): UserEntity {
    return new UserEntity({
      name: 'pari',
      age: '23',
      email: 'parita@gmail.com',
      password: 'pwd',
    });
  }
  @Post()
  //use guard at method level
  // @UseGuards(new UserGuard())
  async create(@Body() user: UserDocument): Promise<UserDocument> {
    return this.UsersService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserDocument,
  ): Promise<UserDocument | null> {
    return this.UsersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const deleted = await this.UsersService.remove(id);
    return { success: deleted };
  }
  //authentication apply
  @Post('register')
  async register(@Body() userDto: UserDocument) {
    return this.UsersService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDocument) {
    return this.UsersService.login(userDto);
  }

  // @UseGuards(UserGuard)
  // @Get('profile')
  // async profile(): Promise<object> {
  //   console.log("contyroller file");

  //   return this.UsersService.profile();
  // }

  //authorization example route
  @Get('nodeJs-developer')
  @UseGuards(UserGuard, new RoleGuard(Role.NodeJs_Developer))
  async nodeJS_developer(): Promise<string> {
    return 'Nodejs developer';
  }

  //cookie example route
  @Get('cookie')
  async cookie_demo(@Req() request: Request): Promise<string> {
    console.log('cookie', request.cookies);
    return;
  }

  //session example route
  @Get('session')
  async session_demo(@Session() session: Record<string, any>) {
    console.log('session::', session);

    session.visits = session.visits ? session.visits + 1 : 1;
    console.log('session.visits:::', session.visits);

    return;
  }
}
