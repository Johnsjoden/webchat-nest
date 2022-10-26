import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [MessagesModule, EventModule],
  controllers: [],
  providers: []
})
export class AppModule { }
