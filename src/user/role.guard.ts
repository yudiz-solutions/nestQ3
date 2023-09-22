import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    private rolePassed:string;
    
    constructor(role:string) {
        this.rolePassed=role;
    }
  

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("In role guard");
    
    const request = context.switchToHttp().getRequest();
   // const token = this.extractTokenFromHeader(request);
    return this.rolePassed === request.user.role;
   
  }

    // private extractTokenFromHeader(request: Request): string | undefined {
    //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //   return type === 'Bearer' ? token : undefined;
    // }
  }

