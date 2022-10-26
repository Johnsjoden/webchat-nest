import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [MessagesModule],
    controllers: [],
    providers: [EventsGateway],
    exports: [EventsGateway]
})
export class EventModule {}
