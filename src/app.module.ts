import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/demo'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }, // Define your user schema
    ]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware) // Apply your user middleware
      .exclude(
        { method: RequestMethod.GET, path: 'user' }, // Exclude GET requests to 'user' route
        // { method: RequestMethod.GET, path: 'user/:id' },
      )
      .forRoutes('user'); // Apply the middleware to routes starting with '/user'
  }
}
