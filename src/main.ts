import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserGuard } from './user/user.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //use guard at global level
  //app.useGlobalGuards(new UserGuard());
  await app.listen(3001);
}
bootstrap();
