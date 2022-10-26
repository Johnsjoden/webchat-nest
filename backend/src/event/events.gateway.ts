
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Message } from '../messages/message.interface';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({ cors: { origin: "*" } })
export class EventsGateway {
  constructor(private messageService: MessagesService) { }
  @WebSocketServer() private readonly server;
  @SubscribeMessage("connection")
  handleConnection(client: Socket) {
    console.log("user connected", client.id)
  }
  handleDisconnect(client: Socket) {
    console.log("user disconnected", client.id)
  }
  @SubscribeMessage("message")
  handleEvent(client: Socket, payload: Message): void {
    this.messageService.createMessage(payload)
    const message = this.messageService.getAllMessages()
    this.server.emit("messageClient", message)
  }

}
