import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Message } from './messages/message.interface';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway({ cors: { origin: "*" } })
export class EventsGateway {
  constructor(private messageService: MessagesService) { }
  @SubscribeMessage("connection")
  handleConnection() {
    console.log("user connected")
  }
  @SubscribeMessage("message")
  handleEvent(client: Socket, payload: Message): void {
    console.log(payload)
    this.messageService.createMessage(payload)
    const message = this.messageService.getAllMessages()
    client.emit("message", message);
  }

}
