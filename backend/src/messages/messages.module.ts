import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [TypeOrmModule.forFeature([Messages])],
    controllers: [MessagesController],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
