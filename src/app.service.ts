import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  modelViewDemo(): any {
    return { message: 'in model view controller file' };
  }
}
