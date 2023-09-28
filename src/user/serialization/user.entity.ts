import { Exclude } from 'class-transformer';

export class UserEntity {
  name: string;
  age: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
