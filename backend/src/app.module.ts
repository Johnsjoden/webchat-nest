import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages/messages.entity';
import { MongooseModule } from '@nestjs/mongoose';
const dotenv = require('dotenv');
dotenv.config()
console.log(process.env.MONGODB_URL)
@Module({
  imports: [MessagesModule, EventModule,
    MongooseModule.forRoot(process.env.MONGODB_URL)],
  controllers: [],
  providers: []
})
export class AppModule { }
