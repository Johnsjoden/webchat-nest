
import { Response } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Messages } from 'src/messages/messages.entity';

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
  async handleEvent(client: Socket, payload: Messages): Promise<void> {
    await this.messageService.createMessage(payload)
    const message = await this.messageService.getAllMessages()
    console.log(message)
    this.server.emit("messageClient", message)
  }

}
