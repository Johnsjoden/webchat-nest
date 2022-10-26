import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({})
export class MessagesModule {
    import: []
    controllers: [MessagesController]
    providers: [MessagesService]
}
