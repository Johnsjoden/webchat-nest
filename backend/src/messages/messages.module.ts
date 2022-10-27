import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Messages, MessagesSchema } from './messages.entity';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }])],
    controllers: [MessagesController],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
