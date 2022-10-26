import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("starting on ",process.env.PORT)
  await app.listen(process.env.PORT);
}
bootstrap();
