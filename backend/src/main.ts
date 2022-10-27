import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "http://localhost:3000" } });
  console.log("starting on ", process.env.BACKEND_PORT || 4000)
  await app.listen(process.env.BACKEND_PORT || 4000);
}
bootstrap();
